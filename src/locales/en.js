const translation = {
  sidebar: {
    main: {
      title: 'Main',
      history: {
        title: 'Research',
        inputMessage: 'Input messages',
        payment: 'Payments'
      },
      reportFee: {
        title: 'Prepare Fee Report'
      },
      report: {
        title: 'Report',
        createReport: 'Prepare fee reports'
      }
    },
    paymentReconciliation: {
      title: 'Payment and Reconciliation',
      DCBS: 'Additional adjustments',
      delcaceDCBS: 'Declare ĐCBS'
    },
    operation: {
      title: 'Operation',
      online: {
        title: 'Report configuration',
        participantStatus: 'Participant status',
        feeConfiguration: 'Header configuration',
        tctvConfiguration: 'Participants configuration',
        ladderConfiguration: 'Ladder configuration',
        configurationFeeFolder: 'Fee configuration',
        configurationSPAccount: 'Special account configuration',
        configurationSPProgram: 'Special account program',
        configurationChargingChannel: 'Configure charging channels',
        configTime: 'Time configuration',
        configTimeSession: 'Session configuration',
        configHoliday: 'Holiday configuration'
      },
      declaration: {
        title: 'Declaration',
        feeDeclaration: 'Fee Declaration'
      },
      assignParticipant: {
        title: 'Assign Participant Schedule',
        assignParticipantfollow: 'Assign Fee By Participant',
        assignParticipantfollowFee: 'Assign Participant by Fee'
      },

      model: {
        addTittle: 'Add new Fee Declaration',
        editTittle: 'Edit Fee Declaration'
      }
    },
    config: {
      title: 'Administration',
      systemparam: {
        title: 'System parameters',
        systemParams: 'Other system parameters',
        process: 'Processing',
        request: 'Request',
        transport: 'Transport'
      },
      participant: {
        title: 'Participant',
        participantEndpoint: 'Participant endpoint'
      }
    },
    administration: {
      title: 'Administration',
      user: {
        title: 'User',
        HisPortalUserAction: 'Activity histories'
      }
    }
  },
  common: {
    button: {
      close: 'Close',
      filter: 'Filter',
      view: 'View',
      login: 'Sign in',
      ok: 'OK',
      save: 'Save',
      add: 'Add',
      deleteConfirm: 'Confirm delete?',
      deleteConfirmContent: 'Are you sure to delete: ',
      moreFilter: 'More filter',
      export: 'Export'
    },
    element: {
      participant: 'Participant',
      bic: 'BIC',
      businessSvcType: 'Busniess Service Type',
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

      creditorResponseCode: 'Creditor ResponseCode',
      acqInstCountryCode: 'ACQ InstCountryCode',
      sourceSystem: 'Source System',
      destSystem: 'Dest System',
      businessSvcCode: 'Business SvcCode',
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
      acceptDatetime: 'Accept Date Time 200',
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
    inputs: {
      payment: 'Payment',
      refund: 'Refund',
      qtbs: 'QTBS',
      all: 'All'
    },
    tabTitle: {
      detail: 'Transaction Detail',
      refund: 'Refund Transaction Details',
      qtbs: 'Additional Settlement Details',
      inputMessage: 'Input messages',
      outputMessage: 'Output messages',
      isoMessage: 'ISO messages',
      refundMessage: 'Refund messages',
      PayUpdateMessage: 'History Change'
    },
    modelPayments: {
      acceptDatetime: 'Accept Date Time',
      modifDatetime: 'Modif Date Time',
      senderReference: 'Sender Reference',
      sizeMore4000: 'sizeMore4000',
      detailTransaction: 'Detail Transaction',
      searchMsgid: 'Seach MsgId',
      contentBody: 'Content',
      numbering: 'No.',
      id: 'ID',
      transRef: 'Transaction Reference',
      msgid: 'MsgId',
      senderDatetime: 'Sender Time',
      timemodif: 'Modification Time',
      timeaccept: 'Acceptance Time',
      requestBody: 'Request Body',
      senderId: 'Sender ID',
      receiverId: 'Receiver ID',
      requestBodyLarge: 'Large Content Information',
      respDatetime: 'Response Receipt Time',
      respResultCode: 'Execution Result Code',
      messageIdentifier: 'Message Identifier',
      respHttpStatusCode: 'Http Status',
      PayUpdateMessage: {
        originalDatetime: 'Original Date',
        modifDatetime: 'Modification Time',
        responseCode: 'Response Code',
        creditorResponseCode: 'Creditor Response Code',
        transactionStatus: 'Transaction Status',
        transactionReference: 'Transaction Ref',
        shortedTransactionReference: 'Shorted Transaction Ref'
      },
      isoMess: {
        isoMessIncoming: 'Message ISO 200',
        isoMessOutgoing: 'Message ISO 210',
        mti: 'MTI',
        cardNo: 'CardNo',
        procCode: 'ProcCode',
        orginalDate: 'Orginal Date',
        tranxDate: 'TranxDate',
        traceNo: 'TraceNo',
        tranxRef: 'TranxRef',
        refNo: 'RefNo',
        acqId: 'TCPL',
        issId: 'IssId',
        approvalCode: 'Approval Code',
        responseCode: 'Response Code',
        termId: 'Term Id',
        originalData: 'Original Data',
        reversed: 'Reversed',
        tnxStamp: 'TnxStamp',
        packager: 'Packager',
        amount: 'Amount',
        accountNo: 'Account No',
        loaclTime: 'Local Time',
        localDate: 'Local Date',
        settleDate: 'Settle Date',
        mcc: 'MCC',
        currencyCode: 'Currency',
        destAccount: 'Dest Account',
        reconcileTime: 'Reconcile Time',
        addInfo: 'add Info',
        serviceCode: 'Service Code',
        vasInfo: 'Vas Information',
        benId: 'Ben Id',
        ibftInfo: 'Ibft Info',
        amountSettlement: 'Amount Settlement',
        amountCardholder: 'Amount Card Holder',
        currencyCodeSettlement: 'Currency Settlement Code',
        currencyCodeCardHolder: 'Currency Card Holder Code',
        conversionRateSettlement: 'Conversion Rate Settlement',
        conversionRateCardholder: 'Conversion Rate Card Holder',
        userDefine: 'User Define',
        acqInstCountryCode: 'Acquiring Institution Country Code',
        posEntryMode: 'Entry Mode POS',
        posConditionCode: 'Condition POS Code',
        cardAcceptIdCode: 'Accept Id Code',
        cardAcceptNameLocation: 'Card Accept Name Location',
        settlementCode: 'Settlement Code',
        paymentCode: 'Payment Code',
        infoHolderBeneciary: 'Info Holder Beneciary',
        recordData: 'Record Data',
        addRecordData: 'AddRecordData',
        importedDatetime: 'Tmported tIME',
        seq_NO: 'Seq No'
      }
    },
    alert: {
      sessionExpired: 'Session expired',
      sessionIdle: 'Session idle',
      loginRequire: 'Please re-login',
      deleteConfirm: 'Delete confirm?',
      deleteConfirmContent: 'Are you sure to delete: ',
      confirm: 'Confirm?'
    }
  },
  main: {
    inputMessage: {
      title: 'Search input messages',
      detailDialogTitle: 'Input message'
    },
    payment: {
      title: 'Search payments',
      detailDialogTitle: 'Payment',
      detailDialogTitleRefun: 'Refund'
    },
    declaration: {
      feeDeclaration: {
        title: 'Fee Declaration'
      }
    },
    isoMessage: {
      detailDialogTitle: 'ISO Message'
    },
    outputMessage: {
      detailDialogTitle: 'Output message'
    },
    messageModal: {
      title: 'Content'
    },
    participantEndpoint: {
      title: 'Setup investigation participants',
      detailDialogTitle: 'Participant info'
    },
    participantStatus: {
      title: 'Participant status',
      alertChange: 'Are you sure switch participant status:'
    }
  },
  auth: {
    loginWelcome: 'Sign in using ACH OAuth'
  }
};

export default translation;
