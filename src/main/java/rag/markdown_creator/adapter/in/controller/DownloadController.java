package rag.markdown_creator.adapter.in.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import rag.markdown_creator.adapter.in.dto.DownloadDocumentRequestDto;
import rag.markdown_creator.application.port.in.DownloadDocumentUseCase;
import rag.markdown_creator.application.vo.DownloadFile;
import rag.markdown_creator.application.vo.MarkdownDocument;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class DownloadController {

    private final DownloadDocumentUseCase downloadDocumentUseCase;

    // 문서 다운로드
    @PostMapping("/api/v1/download")
    public ResponseEntity<Resource> download(List<DownloadDocumentRequestDto> requestDtos) {
        List<MarkdownDocument> documents = requestDtos.stream()
                .map(DownloadDocumentRequestDto::toVo).toList();
        DownloadFile result = downloadDocumentUseCase.execute(documents);

        if(result == null) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.ok()
                .contentType(result.getContentType())
                .contentLength(result.getContent().length)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + result.getFileName() + "\"")
                .body(new ByteArrayResource(result.getContent()));
    }
}
