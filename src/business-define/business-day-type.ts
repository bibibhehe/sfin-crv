export default function businessDayTypeWithDesc(businessDayType: string): string {
    var result: string;
  
    if(businessDayType == null) {
      return null;
    }

    switch (businessDayType) {
      case "SAME":
        result = businessDayType + ' - Trong phiên';
        break;
      case "AFTER":
        result = businessDayType + ' - Sau phiên';
        break;
      default:
        result = businessDayType.toString();
    }
  
    return result;
  }
  