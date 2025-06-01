import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen; 