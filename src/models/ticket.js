import {
  post,
  get,
  put,
  _delete
} from '@/utils/request'

export default class Ticket {
  // eslint-disable-next-line
  static getList({page, size, bankName, ticketType, isFlaw, minFund, maxFund, startTime, endTime, orderColumn, sortType}) {
    return get('v1/ticket/list', {
      page,
      size,
      bank_name: bankName,
      ticket_type: ticketType,
      is_flaw: isFlaw,
      min_fund: minFund,
      max_fund: maxFund,
      start_time: startTime,
      end_time: endTime,
      order_column: orderColumn,
      sort_type: sortType
    })
  }
}
