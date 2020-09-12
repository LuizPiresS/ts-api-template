import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import "./utils/module-alias";

export class SetupServer extends Server {
  constructor(private port = 3003) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
  }
  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }
}
