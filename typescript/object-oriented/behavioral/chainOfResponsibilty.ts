interface IHandler {
  setNextHandler(handler: IHandler): void;
  handle(): void;
}

class ResponsibilitySequenceFactory {
  static createChain(handlers: IHandler[]) {
    handlers.reduce((handler, handlerNext) => {
      handler.setNextHandler(handlerNext);
      return handlerNext;
    });

    return handlers[0];
  }
}

abstract class BaseHandler implements IHandler {
  #nextHandler: IHandler;

  setNextHandler(next: IHandler): void {
    this.#nextHandler = next;
  }

  handle(): void {
    throw new Error("Handler not implemented");
  }

  protected goNext(): void {
    if (this.#nextHandler) {
      this.#nextHandler.handle();
    }
  }
}

class Handler1 extends BaseHandler {
  private canHandle(): boolean {
    return false;
  }

  handle(): void {
    if (this.canHandle()) {
      console.log("Do some specific stuff 1.");
    } else {
      this.goNext();
    }
  }
}

class Handler2 extends BaseHandler {
  private canHandle(): boolean {
    return true;
  }

  handle(): void {
    if (this.canHandle()) {
      console.log("Do some specific stuff 2.");
    } else {
      this.goNext();
    }
  }
}

const chainInPractice = ResponsibilitySequenceFactory.createChain([
  new Handler1(),
  new Handler2(),
]);
