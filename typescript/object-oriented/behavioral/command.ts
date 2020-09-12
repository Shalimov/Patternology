interface ICommand {
  execute(): void;
}

class SaveCommand implements ICommand {
  execute(): void {
    // Save Action
  }
}

class DeleteCommand implements ICommand {
  execute(): void {
    // Delete Action
  }
}