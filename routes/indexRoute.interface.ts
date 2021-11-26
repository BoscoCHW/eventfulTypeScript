import { User } from ".prisma/client";
import { Request } from "express";
import { MemoryStore, Session } from "express-session";

export interface IRequest extends Request {
  sessionStore: ISessionStore;
  file?: any;
  user: User;
}

export interface ISessionStore extends MemoryStore {
  sessions: Iterable<Session>;
}
