interface MessageStatus {
    status: string;
    description: String;
}

const messageStatusList: MessageStatus[] = [
    {
        status: "INCOMING",
        description: "Đã nhận bản tin đến từ client"
    },
    {
        status: "ACCEPTED",
        description: "Bản tin đã pass các bước verify ban đầu"
    },
    {
        status: "RESPONDED",
        description: "Đã gửi phản hồi cho client"
    },
    {
        status: "SENT",
        description: "Đã gửi bản tin đến server"
    },
    {
        status: "RECEIVED",
        description: "Đã nhận phản hồi từ server"
    },
    {
        status: "TIMEOUT",
        description: "Không nhận được phản hồi từ server trong thời gian cho phép"
    },
    {
        status: "REJECTED",
        description: "Bản tin từ client đến bị từ chối xử lý do giới hạn hoặc do đang có request trước đó đang xử lý"
    },
    {
        status: "ERROR",
        description: "Các lỗi không xác định khác"
    },
    {
        status: "BREAK",
        description: "Được cập nhật thủ công"
    }
];

export function messageStatusWithDesc(status: string): string {
    const statusObj = messageStatusList.find((b) => b.status === status);

    if(statusObj != null) {
        return status + " - " + statusObj.description;
    } else {
        return status;
    }
}
