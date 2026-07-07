import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RootNav } from "./navTypes";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Screen, AppHeader, Button, Body, Caption, Divider } from "./ui";

export default function LoginScreen() {
  const navigation = useNavigation<RootNav>();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  return (
    <Screen scroll background={colors.background}>
      <AppHeader title="로그인 · 회원가입" onBack={() => navigation.goBack()} />

      <View style={{ marginTop: spacing.lg }}>
        <Text style={styles.h1}>메모케어에 오신 것을{"\n"}환영합니다</Text>
        <Body style={{ color: colors.mutedForeground, marginTop: spacing.sm }}>
          휴대폰 번호로 간편하게 시작하세요.
        </Body>
      </View>

      <View style={{ marginTop: spacing.xl }}>
        <Caption style={styles.label}>휴대폰 번호</Caption>
        <TextInput
          style={styles.input}
          placeholder="010-0000-0000"
          placeholderTextColor={colors.mutedForeground}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Caption style={[styles.label, { marginTop: spacing.lg }]}>인증번호</Caption>
        <TextInput
          style={styles.input}
          placeholder="6자리 숫자"
          placeholderTextColor={colors.mutedForeground}
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />
      </View>

      <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
        <Button label="다음" onPress={() => navigation.navigate("UserType")} />
        <Button label="인증번호 받기" variant="secondary" onPress={() => {}} />
      </View>

      <Divider />

      <View style={styles.inviteBox}>
        <Text style={styles.inviteTitle}>초대 코드가 있으신가요?</Text>
        <Caption style={{ marginTop: 4 }}>보호자에게 받은 코드로 가족과 연결됩니다.</Caption>
        <TextInput
          style={[styles.input, { marginTop: spacing.md }]}
          placeholder="예) MEMO-2026"
          placeholderTextColor={colors.mutedForeground}
          autoCapitalize="characters"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground, lineHeight: 36 },
  label: { color: colors.foreground, fontWeight: fontWeight.semibold, marginBottom: spacing.sm },
  input: {
    height: 56,
    backgroundColor: colors.inputBackground,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.body,
    color: colors.foreground,
  },
  inviteBox: {
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  inviteTitle: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.secondaryForeground },
});
