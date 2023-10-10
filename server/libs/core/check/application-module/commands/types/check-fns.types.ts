export type IFnsCheckItem = {
  nds: number;
  sum: number;
  name: string;
  price: number;
  quantity: number;
  paymentType: number;
  productType: number;
  productCodeNew?: {
    [key: string]: { gtin: string; sernum: string; productIdType: number; rawProductCode: string };
  };
  itemsQuantityMeasure: number;
  labelCodeProcesMode?: number; // 0
  checkingProdInformationResult?: number; // 0
};
export type IFnsCheck = {
  code: number;
  user: string;
  items: IFnsCheckItem[];
  nds10: number;
  nds18: number;
  region: string;
  userInn: string;
  dateTime: string;
  kktRegId: string;
  metadata: {
    id: number;
    ofdId: string;
    address: string;
    subtype: string;
    receiveDate: string;
  };
  operator: string;
  totalSum: number;
  creditSum: number;
  numberKkt: string;
  fiscalSign: number;
  prepaidSum: number;
  retailPlace: string;
  shiftNumber: number;
  cashTotalSum: number;
  provisionSum: number;
  ecashTotalSum: number;
  operationType: number;
  redefine_mask: number;
  requestNumber: number;
  fiscalDriveNumber: string;
  messageFiscalSign: number;
  retailPlaceAddress: string;
  appliedTaxationType: number;
  fiscalDocumentNumber: number;
  fiscalDocumentFormatVer: number;
  buyerPhoneOrAddress?: string;
  checkingLabeledProdResult?: number; // 1
};
