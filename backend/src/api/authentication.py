from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings


class JWTCookieAuthentication(JWTAuthentication):
    """
    標準のJWT認証を拡張し、HTTP Only Cookieからトークンを抽出するクラス
    """

    def authenticate(self, request):
        cookie_name = settings.SIMPLE_JWT.get("AUTH_COOKIE")
        raw_token = request.COOKIES.get(cookie_name)

        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
