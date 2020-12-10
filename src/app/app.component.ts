import { Component, ElementRef, OnInit, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebVTT } from "vtt.js";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private elRef: ElementRef, private http: HttpClient) {}
  cuetext;

  ngOnInit() {
    this.cuetext = this.getFileData();
  }

  ngAfterViewInit() {
    const div = WebVTT.convertCueToDOMTree(window, this.cuetext);
    this.elRef.nativeElement.appendChild(div);
  }

  getFileData() {
    return this.http.get("/assets/cc1.vtt", { responseType: "text" });
  }
}
