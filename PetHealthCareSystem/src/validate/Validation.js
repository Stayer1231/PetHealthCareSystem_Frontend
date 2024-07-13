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

export const CreateMedicalRecordValidation = (
	data,
	isNextAppointment,
	isAdmissionDate
) => {
	errors = {};
	if (data.recordDetails === "") {
		errors.recordDetails = "Nội dung không được bỏ trống";
	}

	if (data.diagnosis === "") {
		errors.diagnosis = "Chuẩn đoán không được bỏ trống";
	}

	if (data.treatment === "") {
		errors.treatment = "Điều trị không được bỏ trống";
	}

	if (data.note === "") {
		errors.note = "Ghi chú không được bỏ trống";
	}

	if (data.nextAppointment === "" && isNextAppointment) {
		errors.nextAppointment = "Ngày hẹn không được bỏ trống";
	}

	if (data.petWeight == 0 || data.petWeight < 0 || data.petWeight > 100) {
		errors.petWeight = "Cân nặng không hợp lệ";
	}

	if (data.medicalItems.length === 0) {
		errors.medicalItems = "Danh sách thuốc y tế không được bỏ trống";
	} else {
		const isValidMedicalItem = data.medicalItems.some(
			(item) => item.medicalItemId !== 0 && item.quantity > 0
		);
		if (!isValidMedicalItem) {
			errors.medicalItems =
				"Danh sách thuốc y tế phải chứa ít nhất một mục hợp lệ";
		}
	}
	if (isAdmissionDate) {
		if (data.admissionDate === null) {
			errors.admissionDate = "Ngày nhập viện không được bỏ trống";
		}

		if (data.dischargeDate === null) {
			errors.dischargeDate = "Ngày xuất viện dự kiến không được bỏ trống";
		}
	}

	return errors;
};
