import { Component, ElementRef, OnInit, VERSION } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebVTT } from "videojs-vtt.js";
import { first } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private elRef: ElementRef, private http: HttpClient) {}

  async ngOnInit() {}
  async ngAfterViewInit() {
    const cuetext = await this.getFileData()
      .pipe(first())
      .toPromise();
    const parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
    const cues = [];
    const regions = [];
    parser.oncue = function(cue) {
      cues.push(cue);
    };
    parser.onregion = function(region) {
      regions.push(region);
    };

    parser.parse(cuetext);
    parser.flush();

    var video = document.querySelector("video");
    var ct = video.currentTime;

    video.addEventListener("timeupdate", function() {
      var ct = video.currentTime;

      var activeCues = cues.filter(function(cue) {
        return cue.startTime <= ct && cue.endTime >= ct;
      });

      WebVTT.processCues(
        window,
        activeCues,
        document.getElementById("overlay")
      );
    });
  }

  getFileData() {
    return this.http.get("../assets/cc1.vtt", { responseType: "text" });
  }
}
