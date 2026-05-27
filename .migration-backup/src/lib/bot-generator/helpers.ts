export class Helpers {
  static toUsername(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 30);
  }

  static generateEmail(firstName: string, lastName: string, domain: string): string {
    const formats = [
      `${firstName}.${lastName}`,
      `${firstName}${lastName}`,
      `${firstName}.${lastName}${Math.floor(Math.random() * 100)}`,
      `${firstName}_${lastName}`,
      `${firstName}${lastName}${Math.floor(Math.random() * 999)}`
    ];
    return formats[Math.floor(Math.random() * formats.length)].toLowerCase() + '@' + domain;
  }

  static formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  static truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }
}
