import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';

import { Button } from '../../widgets';
import { fetchAd } from '../../../store/actions/ads';
import { apiPath } from '../../../helpers';

const PET_TYPES = {
  dog: 'Cachorro',
  cat: 'Gato',
  bird: 'Pássaro',
  other: 'Outros',
};

const ageText = age => {
  if (age > 12) {
    return `${age / 12} anos`;
  }
  if (age === 12) {
    return `${age} ano`;
  }
  if (age < 12) {
    return `${age} meses`;
  }
};

const ItemWrapper = props => {
  return (
    <View style={{ paddingVertical: 5, ...props.style }}>{props.children}</View>
  );
};

const Separator = () => <View style={styles.separator} />;

const DetailsRow = props => (
  <ItemWrapper style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ flex: 1 }}>
      <Text style={styles.description}>{props.title}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.description}>{props.value}</Text>
    </View>
  </ItemWrapper>
);

class AdDetails extends Component {
  constructor(props) {
    super(props);
  }

  renderAproxAge(age) {
    if (age) {
      return <DetailsRow title="Idade aprox." value={ageText(age)} />;
    }
    return <View />;
  }

  renderWeight(weight) {
    if (weight) {
      return <DetailsRow title="Peso" value={`${weight} kg`} />;
    }
    return <View />;
  }

  renderImage() {
    if (this.props.ad.picture_url) {
      return (
        <Image
          source={{ uri: `${apiPath()}${this.props.ad.picture_url}` }}
          style={styles.image}
        />
      );
    }
    return (
      <Image
        source={require('../../../assets/picture.png')}
        style={styles.image}
      />
    );
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  renderButton() {
    if (
      this.props.currentUser &&
      this.props.currentUser.id === this.props.ad.user.id
    ) {
      return (
        <Button
          text="Editar"
          onPress={() => this.props.navigation.navigate('EditAd')}
        />
      );
    }
    return (
      <Button
        text="Ligar"
        onPress={() =>
          Communications.phonecall(this.props.ad.user.phone_number, true)
        }
      />
    );
  }

  render() {
    if (this.props.isLoading || !this.props.ad) {
      return this.renderLoading();
    }

    const ad = this.props.ad;

    console.log(ad);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.renderImage()}
          <View style={styles.mainView}>
            <ItemWrapper style={{ paddingVertical: 5 }}>
              <Text style={styles.title}>{ad.title}</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.datetime}>
                Publicado em {new Date(ad.created_at).toLocaleDateString()}
              </Text>
            </ItemWrapper>

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Descrição</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.description}>{ad.description}</Text>
            </ItemWrapper>

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Detalhes</Text>
            </ItemWrapper>

            <DetailsRow title="Categoria" value={PET_TYPES[ad.pet_type]} />
            {this.renderWeight(ad.aprox_age)}
            {this.renderAproxAge(ad.aprox_age)}

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Localização</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.description}>
                {ad.city} - {ad.state}
              </Text>
            </ItemWrapper>

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Dados para contato</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.description}>{ad.user.phone_number}</Text>
            </ItemWrapper>

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Anunciado por</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.description}>
                {ad.user.name.split(' ')[0]}
              </Text>
            </ItemWrapper>
          </View>
        </ScrollView>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  mainView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
  },
  datetime: {
    color: '#000',
  },
  separator: {
    backgroundColor: '#CCC',
    width: '100%',
    height: 1,
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: '400',
    fontSize: 18,
  },
  description: {
    textAlign: 'justify',
  },
});

const mapStateToProps = state => {
  return {
    ad: state.ads.selectedAd,
    image: state.ads.selectedImage,
    isLoading: state.ui.isLoading,
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAd: id => dispatch(fetchAd(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdDetails);
