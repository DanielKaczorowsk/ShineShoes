    package com.example.shineshoes.core.builders.user.register;

    import com.example.shineshoes.core.dto.UserDTO;
    import com.example.shineshoes.core.model.User;
    import com.example.shineshoes.core.repository.UserRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Component;

    @Component
    @RequiredArgsConstructor
    public class RegisterBuilder implements RegisterBuilderInterface
    {
        private final PasswordEncoder passwordEncoder;
        private final UserRepository userRepository;

        @Override
        public void build(UserDTO query)
        {
            User user = new User();
            user.setEmail(query.getEmail());
            user.setName(query.getName());
            user.setPassword(this.passwordEncoder.encode(query.getPassword()));
            userRepository.save(user);
        }
    }
