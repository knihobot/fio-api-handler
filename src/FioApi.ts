import { Axios } from "axios";
import { DateTime } from "luxon";
import { fioAxios } from "./fioAxios";

export default class FioApi {
  public apiKey: string;
  public format: string;
  private fioAxios: Axios;
  protected dateFormat = "yyyy-MM-dd";

  public constructor(apiKey: string, format = "json") {
    this.fioAxios = fioAxios;
    this.apiKey = apiKey;
    this.format = format;
  }

  public getTransactionOverview(
    year: number,
    overviewNumber: number
  ): Promise<any> {
    return this.fioAxios.get(
      this.getTransactionsApiUrl("by-id", `${year}/${overviewNumber}`)
    );
  }

  public getTransactions(start: DateTime, end: DateTime): Promise<any> {
    return this.fioAxios.get(
      this.getTransactionsApiUrl(
        "periods",
        `${start.toFormat(this.dateFormat)}/${end.toFormat(this.dateFormat)}`
      )
    );
  }

  public getLastTransactions(): Promise<any> {
    return this.fioAxios.get(this.getTransactionsApiUrl("last"));
  }

  public setLastTransactionById(id: number) {
    return this.fioAxios.get(
      this.getLastTransactionSetApiUrl("id", id.toString())
    );
  }

  public setLastTransactionBydate(date: DateTime) {
    return this.fioAxios.get(
      this.getLastTransactionSetApiUrl("date", date.toFormat(this.dateFormat))
    );
  }

  public getApiUrl(
    action: string,
    namespace: string,
    format: string = this.format
  ): string {
    return `${action}/${this.apiKey}/${namespace}${
      format ? `.${format}` : "/"
    }`;
  }

  public getTransactionsApiUrl(action: string, namespace?: string): string {
    return this.getApiUrl(
      action,
      `${namespace ? `/${namespace}/` : ""}transactions`
    );
  }

  public getLastTransactionSetApiUrl(action: string, value: string): string {
    return this.getApiUrl(`set-last-${action}`, value, undefined);
  }
}
