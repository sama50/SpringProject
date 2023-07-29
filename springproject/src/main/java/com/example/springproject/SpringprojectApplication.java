package com.example.springproject;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;     

 
import java.io.InputStream;

@SpringBootApplication
@RestController
@CrossOrigin("*") // Cross origin protection
@RequestMapping("/api") // routes 
public class SpringprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringprojectApplication.class, args);
	}

	@GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
	private final String FILE_PATH = "C:\\Users\\samad\\OneDrive\\Desktop\\samaaro_project\\demiFile.zip";
    private final String FILE_NAME = "demiFile.zip";

	// @GetMapping("/download")
	// public ResponseEntity<Resource> downloadFile() throws IOException {
    //     File file = new File(FILE_PATH);
    //     InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

    //     HttpHeaders headers = new HttpHeaders();
    //     headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + FILE_NAME);

    //     return ResponseEntity.ok()
    //             .headers(headers)
    //             .contentLength(file.length())
    //             .body(resource);
    // }
	
	@GetMapping("/download")
	public ResponseEntity<InputStreamResource> downloadFile() throws IOException {
        InputStream inputStream = new FileInputStream(FILE_PATH);
        long fileSize = getFileSize(FILE_PATH);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", FILE_NAME);

        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                .headers(headers)
                .contentLength(fileSize)
                .body(new InputStreamResource(inputStream));
    }

    private long getFileSize(String filePath) throws IOException {
        try (InputStream inputStream = new FileInputStream(filePath)) {
            return inputStream.available();
        }
    }

}
