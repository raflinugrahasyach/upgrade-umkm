export class StateManager {
  lastInput: string = "";

  isNewInput(currentInput: string): boolean {
    // Cek apakah input saat ini berbeda dari input terakhir yang diproses
    return currentInput !== this.lastInput;
  }

  updateLastInput(currentInput: string): void {
    // Perbarui input terakhir dengan input saat ini
    this.lastInput = currentInput;
  }
}
