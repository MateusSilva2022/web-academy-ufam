import "express-session";
import { CompraItemInput } from "../resources/compra/compra.types";

declare module "express-session" {
  interface SessionData {
    uid?: string;
    userTypeId?: string;
    cart: CompraItemInput[];
  }
}