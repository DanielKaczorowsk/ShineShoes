    package com.example.shineshoes.core.builders;

    import com.example.shineshoes.core.dto.ExceptionDTO;
    import org.springframework.http.HttpStatus;

    import java.time.LocalDateTime;

    public class BuildExceptionDTO
    {
        private ExceptionDTO query;

        public BuildExceptionDTO()
        {
            this.reset();
        }
        public void reset()
        {
            this.query = new ExceptionDTO();
        }
        public BuildExceptionDTO message(String message)
        {
            this.query.setMessage(message);
            return this;
        }
        public BuildExceptionDTO status(HttpStatus status)
        {
            this.query.setStatus(status);;
            return this;
        }
        public BuildExceptionDTO timestamp(LocalDateTime timestamp)
        {
            this.query.setTimestamp(timestamp);
            return this;
        }
        public ExceptionDTO get()
        {
            return this.query;
        }
    }
