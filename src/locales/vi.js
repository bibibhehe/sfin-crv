const translation = {
  sidebar: {
    main: {
      title: 'Nghiệp vụ',
      history: {
        title: 'Tra cứu',
        inputMessage: 'Bản tin đến',
        payment: 'Giao dịch',
        payment2nd: 'Giao dịch Ủy nhiệm Chi ',
        paymentRefund: 'Giao dich hoàn trả',
      },
      report: {
        title: 'Báo cáo',
        createReport: 'Lập báo cáo tính phí'
      }
    },
    paymentReconciliation: {
      title: 'Thanh toán và đối soát',
      DCBS: 'Điều chỉnh bổ sung',
      delcaceDCBS: 'Khai báo ĐCBS'
    },
    operation: {
      title: 'Vận hành',
      online: {
        title: 'Cấu hình báo cáo',
        participantStatus: 'Trạng thái TCTV',
        feeConfiguration: 'Cấu hình tiêu đề',
        tctvConfiguration: 'Cấu hình TCTV',
        ladderConfiguration: 'Cấu hình bậc thang',
        configurationFeeFolder: 'Cấu hình phí',
        configurationSPAccount: 'Tài khoản đặc biệt',
        configurationSPProgram: 'Chương trình đặc biệt',
        configurationChargingChannel: 'Kênh tính phí',
        configTime: 'Cấu hình thời gian',
        configTimeSession: 'Cấu hình phiên',
        configHoliday: 'Ngày nghỉ lễ ngày làm bù'
      },
      declaration: {
        title: 'Khai báo',
        feeDeclaration: 'Khai báo biểu phí'
      },
      assignParticipant: {
        title: 'Gán biểu phí TCTV',
        assignParticipantfollow: 'Gán biểu phí theo thành viên',
        assignParticipantfollowFee: 'Gán thành viên theo biểu phí'
      },
      model: {
        addTittle: 'Thêm biểu phí mới',
        editTittle: 'Sửa thông tin biểu phí'
      }
    },
    config: {
      title: 'Quản lý',
      systemparam: {
        title: 'Tham số hệ thống',
        systemParams: 'Các tham số khác',
        process: 'Xử lý',
        request: 'Yêu cầu',
        transport: 'Vận chuyển'
      },
      participant: {
        title: 'Thành viên',
        participantEndpoint: 'Kết nối của tổ chức thành viên'
      }
    },
    administration: {
      title: 'Quản lý',
      user: {
        title: 'Người dùng',
        HisPortalUserAction: 'Lịch sử thao tác'
      }
    }
  },
  common: {
    button: {
      close: 'Đóng',
      filter: 'Lọc',
      view: 'Xem',
      login: 'Đăng nhập',
      ok: 'Đồng ý',
      save: 'Lưu',
      add: 'Thêm',
      deleteConfirm: 'Xác nhận xóa?',
      deleteConfirmContent: 'Bạn có chắc chắn muốn xóa: ',
      moreFilter: 'Thêm điều kiện',
      export: 'Xuất'
    },

    element: {
      participant: 'Participant',
      businessSvcCode: 'Business Service Code',
      bic: 'BIC',
      busniessSvcType: 'Busniess Service Type',
      legalName: 'Legal Name',
      shortName: 'Short Name',
      participantCode: 'Participant Code',
      creationDate: 'Creat Date Time',
      citadCode: 'Citad Code',
      modifDate: 'Modify Date',
      legalNameEn: 'Legal Name English',
      debitStatus: 'Debit Status',
      creditStatus: 'Credit Status',
      incomingStatus: 'Incoming Status',
      outgoingStatus: 'Outgoing Status',
      url: 'Url',
      password: 'Password',
      napasPassword: 'Napas Password',
      napasUsername: 'Napas Username',
      settlementType: 'Settlement Type',

      creditorResponseCode: 'Creditor Response Code',
      acqInstCountryCode: 'ACQ InstCountryCode',
      sourceSystem: 'Source System',
      destSystem: 'Dest System',
      settlementDebtorAgent: 'Settlement Debtor',
      settlementCreditorAgent: 'Settlement Creditor',
      endSettleDate: 'End Settle Date',
      beginSettleDate: 'Begin Settle Date',
      channel: 'Channel',
      valueRangeMin: 'Giá trị Tối thiểu',
      valueRangeMax: 'Giá trị Tối đa',
      senderInterchangeFee: 'Phí Giao dịch Phát',
      senderInterchangeFeeType: 'Loại Phí Giao dịch Phát',
      receiverInterchangeFee: 'Phí Giao dịch Nhận',
      receiverInterchangeFeeType: 'Loại Phí Giao dịch Nhận',
      senderProcessingFee: 'Phí Xử lý Phát',
      senderProcessingFeeType: 'Loại Phí Xử lý Phát',
      receiverProcessingFee: 'Phí Xử lý Nhận',
      receiverProcessingFeeType: 'Loại Phí Xử lý Nhận',
      planName: 'Plan name',
      planDescription: 'Plan description',
      ladderEnabledAmount: 'Ladder enable amount',
      returnPaymentFeeType: 'Return payment fee types',
      dateCreate: 'Date create',
      dateModified: 'Date modified',
      tariffPlanCode: 'Tariff planCode',
      tariffPlanId: 'Tariff planId',
      channelTransaction: 'Channel Of Transaction',
      typeServices: 'Type Of Service',
      accType: 'Account Type',
      accNameSender: 'Account Name Sender',
      accNameReciver: 'Account Name Reciver',
      action: 'Action',
      id: 'ID',
      acceptDatetime: 'Accept Date Time',
      originTransRef: 'Original TransRef',
      transDateTime: 'Transaction Date Time',
      modifDatetime: 'Modif datetime',
      modifDateTime: 'Modif Date Time',
      inputMessageId: 'Input MessageId',
      fromAccount: 'Debit Account',
      fromAccountType: 'Debit Account Type',
      destAccount: 'Credit Account',
      destAccountType: 'Credit Account Type',
      narration: 'Fund Transfer Content',
      procCode: 'PCode',
      traceNo: 'Trace',
      refNo: 'Ref No',
      termId: 'Term ID',
      acqId: 'TCPL',
      issId: 'ISS ID',
      benId: 'TCTT',
      approvalCode: 'Approval Code',
      responseCode: 'Response Code',
      transactionStatus: 'Transaction Status',
      currencyCode: 'Currency Code',
      localTime: 'Local Time',
      localDate: 'Local Date',
      localDateTime: 'Local Date Time',
      settleDate: 'Settlement Date',
      settleDateTime: 'Settlement Date Time',
      settlementCurrencyCode: 'Settlement CurrencyCode',
      settlementConversionRate: 'Settlement ConversionRate',
      settlementCode: 'Settlement Code',
      caseId: 'Case Id',
      instuctedResponseCode: 'Instucted ResponseCode',

      importedDateTime: 'Imported Date Time',
      id0200: 'Transaction ID - 0200.',
      id0210: 'Transaction ID - 0210.',
      pan: 'PAN',
      fromAccountName: 'Debitor name',
      fromAccountAddressLine: 'Originating account address.',
      destAccountName: 'Creditor name',
      serviceCode: 'Service code',
      mcc: 'Merchant Category Code.',
      channelId: 'Channel',
      transactionReference: 'Trans Ref',
      shortedTransactionReference: 'Short Trans Ref',
      cardholderAmoumt: 'Cardholder amount.',
      carholderCurrencyCode: 'Cardholder currency code.',
      cardholderCoversionRate: 'Cardholder conversion rate.',
      posEntryMode: 'Point of Service (POS) entry mode.',
      posConditionCode: 'Point of Service (POS) condition code.',
      cardAcceptIdCode: 'Term Code',
      cardAcceptNameLocation: 'Term Name/Location',
      paymentCode: 'Payment code.',
      recordData: 'Associated record data.',
      addRecordData: 'Additional record data.',

      statusTransaction: 'Status Transaction',
      transactionAmount: 'Amount',
      settlementAmount: 'Amount Settlement',
      messageType: 'Message Type',
      beginTime: 'Begin datetime',
      endTime: 'End datetime',
      acceptDateTime: 'Accept Date Time 200',
      responseDatetime: 'Accept Date Time 210',
      responseDateTime: 'Accept Date Time 210',
      creationDateTime: 'Creation datetime',
      paymentDateTime: 'Payment datetime',
      numbering: 'No.',
      debtorAccount: 'Debtor account',
      creditorAccount: 'Creditor account',
      processingMessageStatus: 'Messate status',
      dataSource: 'Source',
      paymentSettleStatus: 'Settled status',
      systemDirection: 'System direction',
      businessDayType: 'Investigation session',
      napasRc: 'NAPAS RespCode',
      benRc: 'TCTT RespCode',
      humanReadableAmount: 'Human readable amount',

      requestContent: 'Request content',
      responseContent: 'Response content',

      processingDetail: 'Processing info',
      participantId: 'Participant ID',

      instructingStatus: 'Instructing status',
      instructedStatus: 'Instructed status',

      rsaScert: 'Participant certificate for message verifying',
      rsaEcert: 'Participant certificate for encrypt sensitive information',

      username: 'Username',
      detail: 'Detail',
      portalUserAction: 'Action',
      keyword: 'Keyword'
    },
    tabTitle: {
      detail: 'Thông tin giao dịch',
      refund: 'Thông tin giao dịch hoàn trả',
      qtbs: 'Thông tin QTBS',
      inputMessage: 'Bản tin đến',
      outputMessage: 'Bản tin đi',
      isoMessage: 'Thông tin ISO',
      refundMessage: 'Thông tin hoàn trả',
      PayUpdateMessage: 'Lịch sử thay đổi'
    },
    inputs: {
      payment: 'Chuyển Tiền',
      refund: 'Hoàn Trả',
      qtbs: 'QTBS',
      all: 'Tất Cả'
    },
    modelPayments: {
      acceptDatetime: 'Accept Date Time',
      modifDatetime: 'Modif Date Time',
      senderReference: 'Sender Reference',
      sizeMore4000: 'sizeMore4000',
      detailTransaction: 'Thông tin giao dịch',
      searchMsgid: 'Tìm kiếm thông tin MsgId',
      contentBody: 'Nội dung bản tin',
      numbering: 'STT',
      id: 'ID',
      transRef: 'Tham chiếu giao dịch',
      msgid: 'MsgId',
      senderDatetime: 'Thời gian gửi',
      timemodif: 'Thời gian sửa đổi',
      timeaccept: 'Thời gian chấp nhận',
      requestBody: 'Nội dung bản tin',
      senderId: 'Mã người gửi',
      receiverId: 'Mã người nhận',
      requestBodyLarge: 'Nội dung chi tiết',
      respDatetime: 'Thời gian nhận phản hồi',
      respResultCode: 'Kết quả thực hiện',
      messageIdentifier: 'Loại định danh',
      respHttpStatusCode: 'Trạng thái http',
      PayUpdateMessage: {
        originalDatetime: 'Thời gian thực hiện',
        modifDatetime: 'Thời gian cập nhật',
        responseCode: 'Trạng thái phản hồi',
        creditorResponseCode: 'Trạng thái cập nhật',
        transactionStatus: 'Trạng thái giao dịch',
        transactionReference: 'Số tham chiếu',
        shortedTransactionReference: 'Số tham chiếu rút gọn'
      },
      isoMess: {
        isoMessIncoming: 'Bản Tin ISO 200',
        isoMessOutgoing: 'Bản Tin ISO 210',
        mti: 'MTI',
        cardNo: 'Số Thẻ',
        procCode: 'Mã Xử Lý',
        orginalDate: 'Ngày Thực Hiện',
        tranxDate: 'Ngày giao dịch',
        traceNo: 'Số Trace',
        tranxRef: 'Tranx Ref',
        refNo: 'Số Tham Chiếu',
        acqId: 'Mã Định Danh Tổ Chức Phát Lệnh',
        issId: 'issId',
        approvalCode: 'Mã Approval',
        responseCode: 'Mã Response',
        termId: 'Term Id',
        originalData: 'Dữ liệu gốc',
        reversed: 'Reversed',
        tnxStamp: 'TnxStamp',
        packager: 'Gói Tin',
        amount: 'Số Tiền Thực Hiện',
        accountNo: 'Số Tài Khoản',
        loaclTime: 'Giờ Chuyển',
        localDate: 'Ngày Chuyển',
        settleDate: 'Ngày Quyết Toán',
        mcc: 'MCC',
        currencyCode: 'Mã Tiền Tệ',
        destAccount: 'Tài Khoản Nhận',
        reconcileTime: 'Thời Gian Báo Cáo',
        addInfo: 'Thông Tin Địa Chỉ',
        serviceCode: 'Mã Dịch Vụ Của Napas',
        vasInfo: 'Thông tin Vas',
        benId: 'Mã Định Danh Tổ Chức Nhận Lệnh',
        ibftInfo: 'Nội Dung Giao Dịch',
        amountSettlement: 'Số Tiền Quyết Toán',
        amountCardholder: 'Số Tiền Chờ Quyết Toán',
        currencyCodeSettlement: 'Mã Tiền Tệ Quyết Toán',
        currencyCodeCardHolder: 'Mã Tiền Tệ Chờ Quyết Toán',
        conversionRateSettlement: 'Tỷ Lệ Chuyển Đổi',
        conversionRateCardholder: 'Tỷ Lệ Chuyển Đổi Chờ Quyết Toán',
        userDefine: 'User Define',
        acqInstCountryCode: 'Mã Quốc gia của Đơn Vị Thu Thập',
        posEntryMode: 'Chế Độ Nhập POS',
        posConditionCode: 'Mã Điều Kiện POS',
        cardAcceptIdCode: 'Mã số chấp nhận thẻ',
        cardAcceptNameLocation: 'Địa chỉ Người Nhận',
        settlementCode: 'Mã Quyết Toán',
        paymentCode: 'Mã Giao Dịch',
        infoHolderBeneciary: 'Thông Tin Người Thụ Hưởng',
        recordData: 'Thông tin lưu trữ',
        addRecordData: 'Nơi lưu trữ',
        importedDatetime: 'Thời gian Ghi Nhận',
        seq_NO: 'Seq No'
      }
    },
    alert: {
      sessionExpired: 'Phiên hết hạn',
      sessionIdle: 'Tự động đăng xuất',
      loginRequire: 'Vui lòng đăng nhập lại',
      deleteConfirm: 'Xác nhận xóa?',
      deleteConfirmContent: 'Bạn có chắc chắn muốn xóa: ',
      confirm: 'Xác nhận?'
    }
  },
  main: {
    inputMessage: {
      title: 'Tra cứu bản tin đến',
      detailDialogTitle: 'Bản tin đến'
    },
    payment: {
      title: 'Tra cứu giao dịch',
      detailDialogTitle: 'Giao dịch',
      detailDialogTitleRefun: 'Hoàn Trả'
    },
    payment2nd: {
      title: 'Tra cứu giao dịch Ủy nhiệm Chi ',
      detailDialogTitle: 'Giao dịch',
      detailDialogTitleRefun: 'Hoàn Trả'
    },
    paymentRefund: {
      title: 'Giao dich hoàn trả',
      detailDialogTitle: 'Giao dịch',
      detailDialogTitleRefun: 'Hoàn Trả'
    },
    reportFee: {
      title: 'Lập báo cáo tính phí'
    },
    declaration: {
      feeDeclaration: {
        title: 'Khai báo biểu phí'
      }
    },
    isoMessage: {
      detailDialogTitle: 'Thông tin ISO'
    },
    outputMessage: {
      detailDialogTitle: 'Bản tin đi'
    },
    messageModal: {
      title: 'Nội dung'
    },
    participantEndpoint: {
      title: 'Khai báo TCTV tham gia hệ thống Investigate',
      detailDialogTitle: 'Thông tin TCTV'
    },
    participantStatus: {
      title: 'Trạng thái của Tổ chức thành viên',
      alertChange: 'Bạn có muốn chuyển trạng thái cho TCTV thành:'
    }
  },
  auth: {
    loginWelcome: 'Đăng nhập sử dụng ACH OAuth'
  }
};

export default translation;
