declare module "exemption-iq" {
  export * from "../../vendor/exemption-iq/dist/index";
}

interface CustomerResponse {
  id: number;
  companyId: number;
  customerCode: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  faxNumber: string;
  emailAddress: string;
  contactName: string;
  country: string;
  region: string;
}

interface Certificate {
  exemptionReason: string;
  id: string;
  signedDate: string;
  expirationDate: string;
  exposureZone: string;
  status: "valid" | "invalid" | "expired";
  pdfUrl: string;
}

interface ExemptionIqTableProps {
  token: string;
  certificates: Certificate[];
  customer: CustomerResponse;
  customerInfo: CustomerInfo;
  state: string;
  showDownload?: boolean;
  manualValidation?: boolean;
  enableGenCertModal?: boolean;
  buttonText?: string;
  buttonTextColor?: string;
  primaryColor?: string;
  dangerColor?: string;
  successColor?: string;
  buttonStyles?: string;
  sessionToken?: { token: string };
  onComplete?: (boolean) => boolean;
  framework?: Framework;
  avataxBaseUrl?: string;
  environment?: "production" | "sandbox";
}

interface ExemptionIqGenCertModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  state: string;
  customerCode: string;
  customerInfo: CustomerInfo;
  disableCustomerFields?: boolean;
  showDownload?: boolean;
  manualValidation?: boolean;
  onCertificateComplete?: (certId: string) => void;
  mode: "renew" | "add";
  onComplete?: (boolean) => boolean;
  environment?: "production" | "sandbox";
}

interface CustomerInfo {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  faxNumber?: string;
  name: string;
  emailAddress: string;
}

interface ExemptionIqProps {
  customerCode: string;
  customerInfo: CustomerInfo;
  state: string;
  showDownload?: boolean;
  manualValidation?: boolean;
  enableGenCertModal?: boolean;
  buttonText?: string;
  buttonTextColor?: string;
  primaryColor?: string;
  dangerColor?: string;
  successColor?: string;
  buttonStyles?: string;
  onComplete?: (boolean) => boolean;
  framework?: Framework;
  avataxBaseUrl?: string;
  environment?: "production" | "sandbox";
}

interface AvataxCertificateClientProps {
  token: string;
  state: string;
  showDownload?: boolean;
  manualValidation?: boolean;
  onCertificateComplete: (certificateId: string) => void;
  onClose: () => void;
  customerCode: string;
  customerInfo: CustomerInfo;
  shouldPrefillState?: boolean;
  mode: "add" | "renew";
  onComplete?: (boolean) => boolean;
  environment?: "production" | "sandbox";
}

declare global {
  interface Window {
    GenCert: {
      init: (
        container: HTMLElement,
        config: {
          token: string;
          customer_number: string;
          ship_zone: string;
          onCertSuccess?: () => void;
          preview?: boolean;
          show_files?: boolean;
          submit_to_stack?: boolean;
        }
      ) => void;
      show: () => void;
      hide: () => void;
      certificateIds?: string[];
      setCustomerData: (customer: {
        name: string;
        address1: string;
        address2?: string;
        city: string;
        state: string;
        zip: string;
        phone: string;
        fax?: string;
        email: string;
      }) => void;
      setShipZone: (zone: string) => void;
    };
  }
}

interface ExemptionIqButtonProps {
  token: string | null;
  isAuthorized: boolean;
  state: string;
  showDownload?: boolean;
  manualValidation?: boolean;
  enableGenCertModal?: boolean;
  buttonText?: string;
  buttonTextColor?: string;
  primaryColor?: string;
  dangerColor?: string;
  successColor?: string;
  buttonStyles?: string;
  customerCode: string;
  customerInfo: CustomerInfo;
  onComplete?: (boolean) => boolean;
  persistAfterSuccess?: boolean;
  matchingCertificate: any;
  sessionToken?: { token: string };
  framework?: Framework;
  environment?: "production" | "sandbox";
}

type Framework = "next" | "remix" | "astro" | "express" | "generic";

interface AddCertificateProps {
  token: string;
  state: string;
  customerCode: string;
  customerInfo: CustomerInfo;
  buttonText?: string;
  buttonTextColor?: string;
  primaryColor?: string;
  buttonStyles?: string;
  showDownload?: boolean;
  manualValidation?: boolean;
  certificateComplete: () => void;
  onComplete?: (boolean) => boolean;
  environment?: "production" | "sandbox";
}

export type { AddCertificateProps, AvataxCertificateClientProps, Certificate, CustomerInfo, CustomerResponse, ExemptionIqButtonProps, ExemptionIqGenCertModalProps, ExemptionIqProps, ExemptionIqTableProps };
