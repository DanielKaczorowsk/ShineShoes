    package com.example.shineshoes.core.builders.user.register;

    import com.example.shineshoes.core.dto.Users.UserRegisterDTO;
    import com.example.shineshoes.core.model.User;
    import com.example.shineshoes.core.repository.UserRepository;
    import lombok.RequiredArgsConstructor;
    import lombok.Setter;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.stereotype.Component;

    @Component
    @RequiredArgsConstructor
    public class RegisterBuilder implements RegisterBuilderInterface
    {
        private final PasswordEncoder passwordEncoder;
        private final UserRepository userRepository;

        @Override
        public void build(UserRegisterDTO userRegisterDTO)
        {
            User user = new User();
            user.setEmail(userRegisterDTO.getEmail());
            user.setName(userRegisterDTO.getName());
            user.setPassword(this.passwordEncoder.encode(userRegisterDTO.getPassword()));
            userRepository.save(user);
        }
    }
