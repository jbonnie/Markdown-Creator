package rag.markdown_creator.application.vo;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MdDocument {
    private String fileName;
    private int fileSize;
    private String content;
}
