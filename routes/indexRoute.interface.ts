import { IUser } from "../interfaces";
import { Request } from "express";
import { MemoryStore, Session } from "express-session";

export interface IRequest extends Request {
  sessionStore: ISessionStore;
  file: any;
  user: IUser;
}

export interface ISessionStore extends MemoryStore {
  sessions: Iterable<Session>;
}
