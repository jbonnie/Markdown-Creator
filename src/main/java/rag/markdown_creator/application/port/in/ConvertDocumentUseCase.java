package rag.markdown_creator.application.port.in;

import org.springframework.web.multipart.MultipartFile;
import rag.markdown_creator.application.vo.MdDocument;

import java.util.List;

public interface ConvertDocumentUseCase {
    MdDocument execute(MultipartFile file);
}
