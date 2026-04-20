export const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('vi-VN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        timeZone: 'Asia/Ho_Chi_Minh'
    }).format(new Date(dateString));
};

export const formatDateTime = (dateString) => {
    return new Intl.DateTimeFormat('vi-VN', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Ho_Chi_Minh'
    }).format(new Date(dateString));
};
