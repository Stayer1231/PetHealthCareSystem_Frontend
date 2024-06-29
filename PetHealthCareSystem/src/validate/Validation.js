const PWD_REGEX = /^.{8,}$/;
const PHONE_REGEX = /^0\d{9}$/;
var errors = {};

export const LoginValidation = (data) => {
	errors = {};
	if (data.username === "") {
		errors.username = "Tên đăng nhập không được bỏ trống";
	}

	if (data.password == "") {
		errors.password = "Mật khẩu không được bỏ trống";
	}

	return errors;
};
