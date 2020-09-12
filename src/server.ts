import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { Application } from 'express';

import { PortfolioController } from './controllers/portfolio';
import './utils/module-alias';

export class SetupServer extends Server {
  constructor(private port = 3003) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const portfolioController = new PortfolioController();
    this.addControllers([portfolioController]);
  }

  public getApp(): Application {
    return this.app;
  }
}
