from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from concurrent.futures import ThreadPoolExecutor
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenVerifyView,
)
from rest_framework_simplejwt.exceptions import TokenError
from .serializers import UserSerializer
from .models import User


class GetUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        username = request.user.username

        print(username)

        return Response({"username": username})


class LoginView(TokenObtainPairView):
    """
    ログインしてアクセストークンとリフレッシュトークンを
    HttpOnly Cookieにセットする
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get("access")
            refresh_token = response.data.get("refresh")

            del response.data["access"]
            del response.data["refresh"]
            response.data["message"] = "ログインに成功しました。"

            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=access_token,
                httponly=True,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
                value=refresh_token,
                httponly=True,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )
        return response


class VerifyTokenView(TokenVerifyView):
    """
    ミドルウェアがアクセストークンの有効性を検証するための軽量なエンドポイント
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print("\n--- VerifyTokenView Called ---")

        token_from_cookie = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        print("Token from cookie:", token_from_cookie)

        if not token_from_cookie:
            print("-> Verdict: No token in cookie. Returning 400.")
            return Response({"error": "トークンがありません。"}, status=status.HTTP_400_BAD_REQUEST)

        request.data["token"] = token_from_cookie

        try:
            print("Calling parent class (TokenVerifyView) to verify...")
            response = super().post(request, *args, **kwargs)
            print("-> Verdict: Parent class verification SUCCEEDED. Status:", response.status_code)
            return response
        except TokenError as e:
            print(f"-> Verdict: Parent class verification FAILED with TokenError: {e}")
            return Response(
                {"error": "トークンが無効です。", "detail": str(e)},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        except Exception as e:
            print(f"-> Verdict: Parent class verification FAILED with an unexpected exception: {e}")
            return Response(
                {"error": "予期せぬエラーが発生しました。", "detail": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class LogoutView(APIView):
    """
    ログアウトしてCookieを削除する
    """

    permission_classes = [AllowAny]

    def delete(self, *args, **kwargs):
        response = Response({"message": "ログアウトしました。"}, status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
        return response


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(
                {"message": "ユーザー登録が成功しました。"}, status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
