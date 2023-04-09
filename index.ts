import axios from "axios";

// cspell:ignore smsir liketolike

/**
 * Class representing the SMS.ir API
 * @author Shahab Movahhedi
 * @see {@link https://shmovahhedi.com Shahab Movahhedi's Website}
 * @see {@link https://github.com/movahhedi/sms-ir-node sms-ir-node's Repository}
 * @license MIT
 */
export class Smsir {
	private ApiKey: string;
	private DefaultLineNumber: number;
	public readonly ApiUrl = "https://api.sms.ir/v1";

	/**
	 * Create a new instance of the Smsir class
	 * @param {string} apiKey - The API key for the SMS.ir account
	 * @param {number} lineNumber - The default line number to use for sending messages
	 */
	constructor(apiKey: string, lineNumber: number) {
		this.ApiKey = apiKey;
		this.DefaultLineNumber = lineNumber;
		return this;
	}

	/**
	 * Make an API request to the SMS.ir API
	 * @private
	 * @param {string} UrlSuffix - The URL suffix for the API endpoint
	 * @param {("GET"|"POST"|"DELETE")} [Method="GET"] - The HTTP method to use for the request
	 * @param {object|null} [Data=null] - The data to send with the request
	 * @returns {Promise} The response from the API
	 */
	private async Api(UrlSuffix: string, Method: "GET" | "POST" | "DELETE" = "GET", Data: object | null = null): Promise<any> {
		return axios({
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-API-KEY": this.ApiKey,
			},
			url: `${this.ApiUrl}/${UrlSuffix}`,
			method: Method,
			data: Data,
		});
	}

	/**
	 * Send a single SMS message to a single recipient
	 * @param {string} MessageText - The text of the message to send
	 * @param {string} Mobile - The mobile number of the recipient
	 * @param {number|null} [SendDateTime=null] - The Unix timestamp of when to send the message (null for immediate sending)
	 * @param {number} [lineNumber=this.DefaultLineNumber] - The line number to use for sending the message
	 * @returns {Promise} The response from the API
	 */
	async Send(
		MessageText: string,
		Mobile: string,
		SendDateTime: number | null = null,
		lineNumber: number = this.DefaultLineNumber
	): Promise<any> {
		return this.SendBulk(MessageText, [Mobile], SendDateTime, lineNumber);
	}

	/**
	 * Send a single SMS message to multiple recipients
	 * @param {string} MessageText - The text of the message to send
	 * @param {Array<string>} Mobiles - An array of mobile numbers of the recipients
	 * @param {number|null} [SendDateTime=null] - The Unix timestamp of when to send the message (null for immediate sending)
	 * @param {number} [lineNumber=this.DefaultLineNumber] - The line number to use for sending the message
	 * @returns {Promise} The response from the API
	 */
	async SendBulk(
		MessageText: string,
		Mobiles: Array<string>,
		SendDateTime: number | null = null,
		lineNumber: number = this.DefaultLineNumber
	): Promise<any> {
		return this.Api("send/bulk", "POST", {
			lineNumber,
			MessageText,
			Mobiles,
			SendDateTime,
		});
	}

	/**
	 * Send multiple SMS messages to multiple recipients (one message per recipient)
	 * @param {string} MessageTexts - The text of the messages to send
	 * @param {Array<string>} Mobiles - An array of mobile numbers of the recipients
	 * @param {number|null} [SendDateTime=null] - The Unix timestamp of when to send the message (null for immediate sending)
	 * @param {number|null} [lineNumber=null] - The line number to use for sending the message (null for default line number)
	 * @returns {Promise} The response from the API
	 */
	async SendLikeToLike(
		MessageTexts: string,
		Mobiles: Array<string>,
		SendDateTime: number | null = null,
		lineNumber: number | null = null
	): Promise<any> {
		return this.Api("send/liketolike", "POST", {
			lineNumber: lineNumber || this.DefaultLineNumber,
			MessageTexts,
			Mobiles,
			SendDateTime,
		});
	}

	/**
	 * Delete a scheduled SMS message
	 * @param {number} PackId - The ID of the scheduled message pack to delete
	 * @returns {Promise} The response from the API
	 */
	async DeleteScheduled(PackId: number): Promise<any> {
		return this.Api(`send/scheduled/${PackId}`, "DELETE");
	}

	/**
	 * Send a verification code via SMS
	 * @param {string} Mobile - The mobile number of the recipient
	 * @param {number} TemplateId - The ID of the verification code template to use
	 * @param {Array<any>} Parameters - An array of parameters to use in the verification code template
	 * @returns {Promise} The response from the API
	 */
	async SendVerifyCode(Mobile: string, TemplateId: number, Parameters: Array<any>): Promise<any> {
		return this.Api("send/verify", "POST", {
			Mobile,
			TemplateId,
			Parameters,
		});
	}

	/**
	 * Get a report on a specific sent SMS message
	 * @param {number} MessageId - The ID of the sent message to get a report on
	 * @returns {Promise} The response from the API
	 */
	async ReportMessage(MessageId: number): Promise<any> {
		return this.Api(`send/${MessageId}`);
	}

	/**
	 * Get a report on a specific sent SMS message pack
	 * @param {number} PackId - The ID of the sent message pack to get a report on
	 * @returns {Promise} The response from the API
	 */
	async ReportPack(PackId: number): Promise<any> {
		return this.Api(`send/pack/${PackId}`);
	}

	/**
	 * Get a report on today's sent SMS messages
	 * @param {number} [pageSize=10] - The number of results to return per page
	 * @param {number} [pageNumber=1] - The page number to return results for
	 * @returns {Promise} The response from the API
	 */
	async ReportToday(pageSize: number = 10, pageNumber: number = 1): Promise<any> {
		return this.Api("send/live", "GET", {
			pageSize,
			pageNumber,
		});
	}

	/**
	 * Get a report on archived sent SMS messages
	 * @param {null} [fromDate=null] - The start date to get results for (null for no start date)
	 * @param {null} [toDate=null] - The end date to get results for (null for no end date)
	 * @param {number} [pageSize=10] - The number of results to return per page
	 * @param {number} [pageNumber=1] - The page number to return results for
	 * @returns {Promise} The response from the API
	 */
	async ReportArchived(
		fromDate: null = null,
		toDate: null = null,
		pageSize: number = 10,
		pageNumber: number = 1
	): Promise<any> {
		return this.Api("send/archive", "GET", {
			fromDate,
			toDate,
			pageSize,
			pageNumber,
		});
	}

	/**
	 * Get a report on the latest received SMS messages
	 * @param {number} [count=100] - The number of results to return
	 * @returns {Promise} The response from the API
	 */
	async ReportLatestReceived(count: number = 100): Promise<any> {
		return this.Api("receive/latest", "GET", { count });
	}

	/**
	 * Get a report on today's received SMS messages
	 * @param {number} [pageSize=10] - The number of results to return per page
	 * @param {number} [pageNumber=1] - The page number to return results for
	 * @returns {Promise} The response from the API
	 */
	async ReportTodayReceived(pageSize: number = 10, pageNumber: number = 1): Promise<any> {
		return this.Api("receive/live", "GET", {
			pageSize,
			pageNumber,
		});
	}

	/**
	 * Get a report on archived received SMS messages
	 * @param {null} [fromDate=null] - The start date to get results for (null for no start date)
	 * @param {null} [toDate=null] - The end date to get results for (null for no end date)
	 * @param {number} [pageSize=10] - The number of results to return per page
	 * @param {number} [pageNumber=1] - The page number to return results for
	 * @returns {Promise} The response from the API
	 */
	async ReportArchivedReceived(
		fromDate: null = null,
		toDate: null = null,
		pageSize: number = 10,
		pageNumber: number = 1
	): Promise<any> {
		return this.Api("receive/archive", "GET", {
			fromDate,
			toDate,
			pageSize,
			pageNumber,
		});
	}

	/**
	 * Get the remaining credit balance for the SMS.ir account
	 * @returns {Promise} The response from the API
	 */
	async GetCredit(): Promise<any> {
		return this.Api("credit");
	}

	/**
	 * Get a list of available line numbers for the SMS.ir account
	 * @returns {Promise} The response from the API
	 */
	async GetLineNumbers(): Promise<any> {
		return this.Api("line");
	}
}
