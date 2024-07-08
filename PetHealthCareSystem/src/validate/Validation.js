const PWD_REGEX = /^.{8,}$/;
const PHONE_REGEX = /^0\d{9}$/;
var errors = {};

export const LoginValidation = (data) => {
    errors = {};
    if (data.username === "") {
        errors.username = "Tên đăng nhập không được bỏ trống";
    }

    if (data.password === "") {
        errors.password = "Mật khẩu không được bỏ trống";
    }

    return errors;
};

export const RegisterValidation = (data) => {
    errors = {};
    if (data.username === "") {
        errors.username = "Tên đăng nhập không được bỏ trống";
    }

    if (data.fullName === "") {
        errors.fullName = "Họ và tên không được bỏ trống";
    }

    if (data.email === "") {
        errors.email = "Email không được bỏ trống";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Email không hợp lệ";
    }

    if (data.phone === "") {
        errors.phone = "Số điện thoại không được bỏ trống";
    } else if (!PHONE_REGEX.test(data.phone)) {
        errors.phone = "Số điện thoại không hợp lệ";
    }

    if (data.password === "") {
        errors.password = "Mật khẩu không được bỏ trống";
    } else if (!PWD_REGEX.test(data.password)) {
        errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }

    if (data.confirmPassword === "") {
        errors.confirmPassword = "Xác nhận mật khẩu không được bỏ trống";
    } else if (data.confirmPassword !== data.password) {
        errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    return errors;
};

export const CreatePetValidation = (data) => {
    errors = {};
    if (data.name === "") {
        errors.name = "Tên thú cưng không được bỏ trống";
    }

    if (data.species === "") {
        errors.species = "Loại thú cưng không được bỏ trống";
    }

    if (data.breed === "") {
        errors.breed = "Giống thú cưng không được bỏ trống";
    }

    if (data.dateOfBirth === "") {
        errors.dateOfBirth = "Ngày sinh không được bỏ trống";
    }

    if (data.gender === "") {
        errors.gender = "Giới tính không được bỏ trống";
    }

    if (data.isNeutered == null) {
        errors.isNeutered = "Thông tin thiến của thú ý không được bỏ trống";
    }
    return errors;
};

export const UpdatePetValidation = (data) => {
    errors = {};
    if (data.name === "") {
        errors.name = "Tên thú cưng không được bỏ trống";
    }

    if (data.breed === "") {
        errors.breed = "Giống thú cưng không được bỏ trống";
    }

    if (data.dateOfBirth === "") {
        errors.dateOfBirth = "Ngày sinh không được bỏ trống";
    }

    return errors;
};
