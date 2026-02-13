package rag.markdown_creator.adapter.in;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import rag.markdown_creator.adapter.in.dto.MdDocumentResponseDto;
import rag.markdown_creator.application.port.in.ConvertDocumentUseCase;
import rag.markdown_creator.application.vo.MdDocument;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ConvertController {

    private final ConvertDocumentUseCase convertDocumentUseCase;

    // 문서 변환
    @PostMapping("/api/v1/convert")
    public ResponseEntity<List<MdDocumentResponseDto>> convert(List<MultipartFile> files) {
        List<MdDocument> results = files.stream().map(convertDocumentUseCase::execute).toList();
        List<MdDocumentResponseDto> responseDtos = results.stream()
                .map(MdDocumentResponseDto::from).toList();
        return ResponseEntity.ok(responseDtos);
    }
}
