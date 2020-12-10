import { Component, OnInit, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  vtt1;

  ngOnInit() {
    this.getFileData().subscribe(response => console.log(response));
  }

  getFileData() {
    return this.http.get("../assets/cc1.vtt", {
      responseType: "text"
    });
  }
}
