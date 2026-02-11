package rag.markdown_creator.adapter.in.dto;

import lombok.Builder;
import lombok.Getter;
import rag.markdown_creator.application.vo.MdDocument;

@Getter
@Builder
public class MdDocumentResponseDto {
    private String fileName;
    private int fileSize;
    private String content;

    public static MdDocumentResponseDto from(MdDocument document) {
        return MdDocumentResponseDto.builder()
                .fileName(document.getFileName())
                .fileSize(document.getFileSize())
                .content(document.getContent())
                .build();
    }
}
