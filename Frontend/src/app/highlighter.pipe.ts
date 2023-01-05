import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "highlighter",
})
export class HighlighterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!args) return value;

    const re = new RegExp(args, "igm");
    const isMatch = value.match(re);

    if (!isMatch) {
      return value;
    }

    return value.replace(
      re,
      `<span class="highlighted-text">${isMatch[0]}</span>`
    );
  }
}
