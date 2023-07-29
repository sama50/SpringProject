import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';

import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'samaro-app';
  constructor(private http: HttpClient) {}
  // private readonly serverUrl = 'ws://localhost:8080/ws'; // WebSocket URL
  // private socket!: WebSocketSubject<any>;

  // ngOnInit(): void {
  //   this.initializeWebSocket();
  // }

  // ngOnDestroy(): void {
  //   this.socket.complete();
  // }
  // initializeWebSocket(): void {
  //   this.socket = webSocket(this.serverUrl);

  //   this.socket.subscribe(
  //     (message) => {
  //       console.log('WebSocket Message:', message);
  //       this.showWebSocketMessageAlert(message['message']); // Show the message as a pop-up alert
  //     },
  //     (error) => {
  //       console.error('WebSocket Error:', error);
  //     },
  //     () => {
  //       console.log('WebSocket Connection Closed');
  //     }
  //   );
  // }
  showWebSocketMessageAlert(message: any): void {
    alert(message);
  }
  downloadFile(): void {
    const FILE_NAME = 'large-file.zip';

    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${FILE_NAME}`,
    });

    this.http.get('http://localhost:8080/api/download', {
      headers,
      observe: 'events', // Observe events to track progress
      responseType: 'blob', // Receive response as a Blob
    })
    .subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress && event.total) {
        // Handle progress updates if needed
        const percentDone = Math.round(100 * (event.loaded / event.total));
        console.log(`File download progress: ${percentDone}%`);
      } else if (event.type === HttpEventType.Response) {
        // Trigger the download when the full file is received
        const blob = new Blob([event.body as Blob], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = FILE_NAME;
        a.click();
      }
    });
  }
  
  // downloadFile(): void {
  //   // Send the request to the server and get the file as a blob
  //   this.http.get('http://localhost:8080/api/download', { responseType: 'blob' })
  //     .subscribe((response: Blob) => {
  //       // Create a URL for the blob
  //       const url = window.URL.createObjectURL(response);
  
  //       // Create a link and trigger the download
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'demiFile.zip'; // File name
  //       a.click();
  
  //       // Revoke the URL object to free up resources
  //       window.URL.revokeObjectURL(url);
  //     });
  // }
  
  
}
