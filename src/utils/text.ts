import {SimpleCrypto} from "simple-crypto-js"
import conf from '../settings/conf'

const simpleCrypto = new SimpleCrypto(conf.app_key)
export const encrypt = (text: string) => simpleCrypto.encrypt(text);
export const decrypt = (text: string) => simpleCrypto.decrypt(text);
export const pkByText = (text: string, length: number = 10) => simpleCrypto.encrypt(text).substring(0, length);