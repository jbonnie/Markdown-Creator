package rag.markdown_creator.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import rag.markdown_creator.application.port.in.*;
import rag.markdown_creator.application.vo.MdDocument;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConvertDocumentService implements ConvertDocumentUseCase {

    private final ReadDocumentUseCase readDocumentUseCase;
    private final SplitDocumentUseCase splitDocumentUseCase;
    private final GeneratePromptUseCase generatePromptUseCase;
    private final ChatUseCase chatUseCase;

    @Override
    public MdDocument execute(MultipartFile file) {
        String fileName = file.getOriginalFilename() != null && !file.getOriginalFilename().isBlank()
                ? file.getOriginalFilename() : "document.md";

        // 1. 문서 읽기
        List<Document> readResult = readDocumentUseCase.execute(file);
        // 2. 문서 청킹
        List<Document> splitResult = splitDocumentUseCase.execute(readResult);
        // 3. 문서 변환
        StringBuilder markdown = new StringBuilder();
        splitResult.forEach(document -> {
            Prompt prompt = generatePromptUseCase.execute(document.getText());
            String convertResult = chatUseCase.chat(prompt);
            markdown.append(convertResult);
        });

        return MdDocument.builder()
                .fileName(fileName)
                .content(markdown.toString())
                .fileSize(markdown.toString().getBytes(StandardCharsets.UTF_8).length)
                .build();
    }
}
