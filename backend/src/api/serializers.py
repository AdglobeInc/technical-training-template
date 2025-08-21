from .models import User
from rest_framework import serializers, validators
from django.core.validators import RegexValidator


alphanumeric_validator = RegexValidator(r"^[a-zA-Z0-9]*$", "英数字のみ使用できます。")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "password")

    username = serializers.CharField(
        required=True,
        max_length=20,
        validators=[
            validators.UniqueValidator(
                queryset=User.objects.all(), message="このユーザーIDはすでに使用されています。"
            ),
            alphanumeric_validator,
        ],
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        min_length=8,
        max_length=20,
        validators=[alphanumeric_validator],
        style={"input_type": "password"},
        help_text="8文字以上20文字以内の英数字で入力してください。",
    )

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user


# class RegisterSerializer(serializers.ModelSerializer):
#     name = serializers.CharField(
#         required=True,
#         max_length=20,
#         validators=[
#             validators.UniqueValidator(
#                 queryset=User.objects.all(), message="このユーザーIDはすでに使用されています。"
#             ),
#             alphanumeric_validator,
#         ],
#     )
#     password = serializers.CharField(
#         write_only=True,
#         required=True,
#         min_length=8,
#         max_length=20,
#         validators=[alphanumeric_validator],
#         style={"input_type": "password"},
#         help_text="8文字以上20文字以内の英数字で入力してください。",
#     )

#     class Meta:
#         model = User
#         fields = ("username", "password")

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data["username"],
#             password=validated_data["password"],
#         )
#         return user
