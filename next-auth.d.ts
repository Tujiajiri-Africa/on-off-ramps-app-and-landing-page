//import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type UserAddressProps = {
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  street?: string;
  zip_code?: string;
  building?: string;
  update_count?: number
}

export type ExtendedUser = DefaultSession["user"] & {
  email: string;
  accessToken: string;
  tokenType: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: UserAddressProps;
  currency: string;
  iso_code: string;
  country_name: string;
  phone_code: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
