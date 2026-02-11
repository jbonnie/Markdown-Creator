package rag.markdown_creator.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rag.markdown_creator.application.port.in.ConvertDocumentUseCase;
import rag.markdown_creator.application.port.in.ReadDocumentUseCase;
import rag.markdown_creator.application.port.in.SplitDocumentUseCase;
import rag.markdown_creator.application.vo.MdDocument;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConvertDocumentService implements ConvertDocumentUseCase {

    private final ReadDocumentUseCase readDocumentUseCase;
    private final SplitDocumentUseCase splitDocumentUseCase;

    @Override
    public MdDocument execute(MultipartFile file) {
        String fileName = file.getOriginalFilename() != null && !file.getOriginalFilename().isBlank()
                ? file.getOriginalFilename() : "document.md";

        List<Document> readResult = readDocumentUseCase.execute(file);
        List<Document> splitResult = splitDocumentUseCase.execute(readResult);
        StringBuilder markdown = new StringBuilder();
        // TODO: AI 질의를 통해 마크다운 문법 변환

        return MdDocument.builder()
                .fileName(fileName)
                .content(markdown.toString())
                .fileSize(markdown.toString().getBytes(StandardCharsets.UTF_8).length)
                .build();
    }
}
