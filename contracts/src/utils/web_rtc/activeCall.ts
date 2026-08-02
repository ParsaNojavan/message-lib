import { RtcType } from "../../models/enums/rtc-type";

export interface ActiveCall {
  callId: string;
  callerId: string;
  calleeId: string;
  type: RtcType;
  status: 'dialing' | 'connected';
}