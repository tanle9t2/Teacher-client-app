export const formatCurrencyVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
};
export const calculateDayDifference = (date) => {
    // Chuyển đổi ngày sang đối tượng Date
    // Chuyển đổi ngày sang đối tượng Date
    const d1 = new Date();
    const d2 = new Date(date);
    // Tính số mili-giây giữa hai ngày
    const differenceInTime = Math.abs(d1 - d2);
    // Chuyển đổi mili-giây thành số ngày
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    // Nếu khoảng cách lớn hơn 24 tháng (730 ngày), trả về số năm
    if (differenceInDays > 730) {
        const differenceInYears = Math.floor(differenceInDays / 365); // 365 ngày = 1 năm
        return `${differenceInYears} năm`;
    }

    // Nếu khoảng cách lớn hơn 30 ngày, trả về số tháng
    if (differenceInDays > 30) {
        const differenceInMonths = Math.floor(differenceInDays / 30); // 30 ngày = 1 tháng  
        return `${differenceInMonths} tháng`;
    }

    // Nếu nhỏ hơn hoặc bằng 30 ngày, trả về số ngày
    return `${differenceInDays} ngày`;
}


export const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
};
export const validatePhone = (value) => {
    const phoneRegex = /^(?:\(\+\d{1,3}\) )?\d{1,3}(?:\s?\d{3}){0,3}$/;
    return phoneRegex.test(value)
}
export const splitName = (fullName) => {
    return {
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ").slice(1).join(" "),
    }
}
export const isValidDate = (day, month, year) => {
    // Month in JavaScript Date is 0-based (0 = January, 11 = December)
    if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
        return false;
    }
    if (day < 1 || month < 1 || month > 12 || year < 1) {
        return false;
    }
    const date = new Date(year, month - 1, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}
const statusTranslations = {
    COMPLETE: "Hoàn thành",
    PROCESSING: "Đang xử lý",
    AWAITING_PAYMENT: "Đang chờ thanh toán",
    CANCELED: "Đã hủy",
    CANCELLATION_REQUEST: "Yêu cầu hủy"
};
const Filters = {
    category: "Theo danh mục",
    location: "Nơi bán"
}

export const translateStatus = (status) => {
    return statusTranslations[status] || "Trạng thái không xác định";
}
export const translateFilter = (filter) => {

    return Filters[filter.toLowerCase()] || "Filter không xác định"
}
export const getDateRange = () => {
    const date = new Date();

    // Move to the next day
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() + 2);

    // Move to 4 days later
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 4);

    // Format the dates
    const formatDate = (d) => ` ${d.getDate()} Tháng ${d.getMonth() + 1}`;

    return `${formatDate(startDate)} -${formatDate(endDate)}`;
}

export const getAuth = () => {
    if (!localStorage.getItem("auth"))
        setAuth({})
    return JSON.parse(localStorage.getItem("auth") ? localStorage.getItem("auth") : {});
}
export const setAuth = (auth) => {
    localStorage.setItem("auth", JSON.stringify(auth));

}
export const getFileType = (file) => {
    const mimeType = file.type;

    if (mimeType.startsWith("video/")) {
        return "VIDEO"
    } else if (
        mimeType === "application/pdf" ||
        mimeType === "application/msword" ||
        mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
        mimeType === "application/vnd.ms-excel" ||
        mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
    ) {
        return "FILE"
    }
}
export const getFileNameFromUrl = (url) => {
    const cleanUrl = url.split('?')[0]; // Remove query params if any
    return decodeURIComponent(cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1));
}
export const formatWithDots = (number) => {

    if (!number) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const convertDate = (createdAt) => {
    const date = new Date(createdAt[0], createdAt[1] - 1, createdAt[2], createdAt[3], createdAt[4]);
    const formatted =
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '-' +
        (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' +
        date.getFullYear() + ' ' +
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    return formatted;
}
export const getAccessToken = () => {
    const token = window.localStorage.getItem("auth_token");
    if (token == null) return null;
    return JSON.parse(token).accessToken;
};

export const getRefreshToken = () => {
    const token = window.localStorage.getItem("auth_token");
    if (token == null) return null;
    return JSON.parse(token).refreshToken;
};

export const AuthenticationHeader = function () {
    return {
        Authorization: `Bearer ${getAccessToken()}`,
    };
};

export const setLocalStorageToken = (token) => {
    window.localStorage.setItem("auth_token", JSON.stringify(token));
};

export const removeLocalStorageToken = () => {
    window.localStorage.removeItem("auth_token");
};

export function generateUUID() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (
            +c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
        ).toString(16)
    );
}

