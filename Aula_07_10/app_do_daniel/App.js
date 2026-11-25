import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const tabs = [
  { id: 'home', label: 'Início', mark: '⌂' },
  { id: 'history', label: 'História', mark: '◷' },
  { id: 'games', label: 'Modalidades', mark: '◇' },
  { id: 'fans', label: 'Torcida', mark: '⚑' },
];

const games = [
  ['VALORANT', 'FPS tático', 'A LOUD conquistou o VALORANT Champions em 2022.'],
  ['League of Legends', 'MOBA', 'A organização conquistou seu primeiro título do CBLOL em 2022.'],
  ['Free Fire', 'Battle royale', 'O jogo mobile marcou o início da trajetória da LOUD nos esports.'],
];

const green = '#75FF39';
const muted = '#B0BBB4';
const background = '#0B100D';

function Action({ label, onPress, secondary = false }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}
      style={({ pressed }) => [styles.action, secondary && styles.secondary, pressed && styles.pressed]}>
      <Text style={[styles.actionText, secondary && styles.secondaryText]}>{label}</Text>
      <Text style={[styles.actionText, secondary && styles.secondaryText]} accessibilityElementsHidden>↗</Text>
    </Pressable>
  );
}

function Card({ title, tag, children, column = false }) {
  return (
    <View style={[styles.card, column && styles.cardColumn]}>
      {tag && <Text style={styles.kicker}>{tag}</Text>}
      <Text accessibilityRole="header" style={styles.cardTitle}>{title}</Text>
      <Text style={styles.copy}>{children}</Text>
    </View>
  );
}

function ScreenHeading({ title, description, wide }) {
  return (
    <View style={styles.heading}>
      <Text accessibilityRole="header" style={[styles.title, wide && styles.wideTitle]}>{title}</Text>
      <Text style={styles.copy}>{description}</Text>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [cheered, setCheered] = useState(false);
  const { width } = useWindowDimensions();
  const wide = width >= 720;

  async function openInstagram() {
    try {
      await Linking.openURL('https://www.instagram.com/loudgg/');
    } catch {
      Alert.alert('Instagram indisponível', 'Procure por @loudgg no Instagram.');
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.brand}>
            <View style={styles.brandIcon}><Text style={styles.brandGlyph}>L</Text></View>
            <Text style={styles.brandName}>LOUD</Text>
          </View>
          <Text style={styles.headerLabel}>APP DE FÃS</Text>
        </View>
      </View>

      <ScrollView key={screen} style={styles.scroll} contentContainerStyle={styles.content}>
        {screen === 'home' && (
          <>
            <View style={[styles.hero, wide && styles.heroWide]}>
              <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.heroGraphic}>
                <View style={styles.outline} />
                <View style={styles.outlineInner} />
                <Text style={styles.heroGlyph}>L</Text>
              </View>
              <View style={[styles.heroCopy, wide && styles.heroCopyWide]}>
                <Text style={styles.kicker}>ESPORTS BRASILEIRO</Text>
                <Text accessibilityRole="header" style={[styles.title, wide && styles.wideTitle]}>FAZ O <Text style={styles.green}>L.</Text></Text>
                <Text style={styles.copy}>Conheça a história da LOUD, relembre suas conquistas e faça parte da torcida.</Text>
                <Action label="Conhecer a LOUD" onPress={() => setScreen('history')} />
              </View>
            </View>
            <View style={[styles.cards, wide && styles.cardsWide]}>
              <Card title="Onde a LOUD compete" tag="MODALIDADES" column={wide}>
                Explore três jogos que marcaram a trajetória da organização.
              </Card>
              <Card title="Apoie a LOUD" tag="TORCIDA" column={wide}>
                Faça o L e acompanhe o time pelas redes sociais.
              </Card>
            </View>
          </>
        )}

        {screen === 'history' && (
          <>
            <ScreenHeading title="História" description="Dos jogos de celular aos palcos internacionais." wide={wide} />
            <Card title="O começo da LOUD" tag="2019">
              Bruno PlayHard, Jean Ortega e Matthew Ho fundaram a organização no Brasil, com foco em jogos mobile e criação de conteúdo.
            </Card>
            <Card title="Campeã mundial de VALORANT" tag="2022">
              A LOUD venceu a OpTic Gaming na final do VALORANT Champions e conquistou o título mundial.
            </Card>
          </>
        )}

        {screen === 'games' && (
          <>
            <ScreenHeading title="Modalidades" description="Três jogos que marcaram a história da LOUD." wide={wide} />
            <View style={[styles.cards, wide && styles.cardsWide]}>
              {games.map(([title, tag, description]) => (
                <Card key={title} title={title} tag={tag} column={wide}>{description}</Card>
              ))}
            </View>
          </>
        )}

        {screen === 'fans' && (
          <>
            <ScreenHeading title="Torcida" description="Mostre seu apoio e acompanhe a LOUD fora das partidas." wide={wide} />
            <View style={styles.card}>
              <Text accessibilityRole="header" style={styles.cardTitle}>Faz o L!</Text>
              <Text accessibilityLiveRegion="polite" style={styles.copy}>
                {cheered ? 'Você fez o L! 💚' : 'Toque no botão para fazer o L.'}
              </Text>
              <Action label={cheered ? 'Desfazer apoio' : 'Fazer o L'} onPress={() => setCheered(!cheered)} />
              <Action label="Instagram da LOUD" secondary onPress={openInstagram} />
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.navigation}>
        <View style={styles.navContent} accessibilityRole="tablist">
          {tabs.map(({ id, label, mark }) => (
            <Pressable key={id} accessibilityRole="tab" accessibilityLabel={label}
              accessibilityState={{ selected: screen === id }} onPress={() => setScreen(id)}
              style={({ pressed }) => [styles.tab, screen === id && styles.activeTab, pressed && styles.pressed]}>
              <Text style={[styles.tabMark, screen === id && styles.green]}>{mark}</Text>
              <Text style={[styles.tabLabel, screen === id && styles.green]}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: background },
  header: { borderBottomWidth: 1, borderColor: '#243029', backgroundColor: '#0F1611' },
  headerContent: {
    width: '100%', maxWidth: 1100, alignSelf: 'center', minHeight: 76,
    paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandIcon: {
    backgroundColor: green, width: 34, height: 34, borderRadius: 7,
    alignItems: 'center', justifyContent: 'center',
  },
  brandGlyph: { color: background, fontSize: 24, fontWeight: '900', fontStyle: 'italic' },
  brandName: { color: '#F3FFF4', fontSize: 23, fontWeight: '900', letterSpacing: 3 },
  headerLabel: { color: muted, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  scroll: { flex: 1 },
  content: { width: '100%', maxWidth: 1100, alignSelf: 'center', padding: 20, gap: 16 },
  hero: {
    backgroundColor: '#14201A', borderRadius: 19, borderWidth: 1,
    borderColor: '#304438', padding: 22, overflow: 'hidden',
  },
  heroWide: { minHeight: 386, padding: 44, justifyContent: 'center' },
  heroCopy: { gap: 14 },
  heroCopyWide: { maxWidth: '52%' },
  heroGraphic: {
    position: 'absolute', right: '-4%', top: -46, width: 325, height: 325,
    justifyContent: 'center', alignItems: 'center',
  },
  outline: {
    position: 'absolute', width: 260, height: 260, borderRadius: 35,
    borderWidth: 1, borderColor: '#344C33', transform: [{ rotate: '26deg' }],
  },
  outlineInner: {
    position: 'absolute', width: 212, height: 212, borderRadius: 28,
    borderWidth: 1, borderColor: '#3C5636', transform: [{ rotate: '16deg' }],
  },
  heroGlyph: { color: '#3B6231', fontSize: 186, fontWeight: '900', fontStyle: 'italic' },
  heading: { paddingVertical: 18, gap: 10 },
  kicker: { color: green, fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  title: { color: '#F3FFF4', fontSize: 46, fontWeight: '900', letterSpacing: -1.5 },
  wideTitle: { fontSize: 72, letterSpacing: -3 },
  green: { color: green },
  copy: { color: muted, fontSize: 16, lineHeight: 24 },
  cards: { gap: 14 },
  cardsWide: { flexDirection: 'row' },
  cardColumn: { flexGrow: 1, flexBasis: 0 },
  card: {
    backgroundColor: '#111A15', borderWidth: 1,
    borderColor: '#27382E', borderRadius: 15, padding: 20, gap: 9,
  },
  cardTitle: { color: '#F3FFF4', fontWeight: '800', fontSize: 22 },
  action: {
    alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center',
    gap: 18, minHeight: 48, paddingHorizontal: 17, marginTop: 5,
    borderRadius: 8, backgroundColor: green,
  },
  actionText: { color: background, fontWeight: '800', fontSize: 15 },
  secondary: { backgroundColor: '#203128', borderWidth: 1, borderColor: '#3B5143' },
  secondaryText: { color: '#F3FFF4' },
  pressed: { opacity: 0.75 },
  navigation: { backgroundColor: '#0F1611', borderTopWidth: 1, borderColor: '#27382E' },
  navContent: {
    width: '100%', maxWidth: 700, alignSelf: 'center', flexDirection: 'row',
    gap: 4, paddingHorizontal: 8, paddingTop: 8, paddingBottom: 14,
  },
  tab: { flex: 1, minHeight: 57, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#202F24' },
  tabMark: { color: muted, fontSize: 23, lineHeight: 27, fontWeight: '800' },
  tabLabel: { color: muted, fontSize: 12, fontWeight: '800' },
});
