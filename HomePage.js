import React from 'react';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';
import farmBackground from '../assets/back.jpg';
import farmIcon from '../assets/farmer.png';
import buyerIcon from '../assets/buyer-icon.jpeg';
import communityIcon from '../assets/community-icon.jpg';
import { FaTwitter, FaInstagram, FaGoogle, FaEnvelope } from 'react-icons/fa'; 

const HomePage = () => {
  return (
    <Container>
    
      <Header>
        <Title>Welcome to the Farmer's Dashboard</Title>
        <Navbar>
          <NavLinksContainer>
            <NavLink to="/HomePage">🏠 Home</NavLink>
            <NavLink to="/MyProduct">🌿 My Products</NavLink>
            <NavLink to="/orders">📦 Orders</NavLink>
            <NavLink to="/Contact Us">📞 Contact Us</NavLink>
          </NavLinksContainer>
          <LogoutButton to="/">🚪 Logout</LogoutButton>
        </Navbar>
      </Header>

      <HeroSection>
        <HeroImage src={farmBackground} alt="Farm Background" />
        <HeroContent>
          <HeroTitle></HeroTitle>
          <HeroDescription>
            Discover new opportunities, connect with buyers, and build a thriving farming community.
          </HeroDescription>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesHeader>Standout Features</FeaturesHeader>
        <FeaturesContainer>
          <FeatureBox>
            <FeatureImage src={buyerIcon} alt="Buyer Connection" />
            <FeatureTitle>Buyer Connection</FeatureTitle>
            <FeatureDescription>Get in direct touch with the buyer to satisfy its need</FeatureDescription>
          </FeatureBox>
          <FeatureBox>
            <FeatureImage src={farmIcon} alt="Farm Management" />
            <FeatureTitle>Farm Management</FeatureTitle>
            <FeatureDescription>Streamline your farming operations and maximize productivity</FeatureDescription>
          </FeatureBox>
          <FeatureBox>
            <FeatureImage src={communityIcon} alt="Farmer Group Formation" />
            <FeatureTitle>Farmer Group Formation</FeatureTitle>
            <FeatureDescription>Connect with other farmers and build a supportive community</FeatureDescription>
          </FeatureBox>
        </FeaturesContainer>
      </FeaturesSection>

      <Footer>
        <PaymentSection>
          <PaymentText>Payment Options</PaymentText>
          <PaymentContainer>
            <PaymentImage src={require('../assets/razorpay.jpg')} alt="RazorPay" />
            <PaymentImage src={require('../assets/cash.jpg')} alt="Cash on Delivery" />
          </PaymentContainer>
        </PaymentSection>
        <SocialIcons>
          <FaTwitter className="icon" />
          <FaInstagram className="icon" />
          <FaGoogle className="icon" />
          <FaEnvelope className="icon" />
        </SocialIcons>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #f0f4c3;
  color: #333;
`;
const Header = styled.header`
  background: linear-gradient(135deg, rgb(145, 159, 112) 0%, rgba(85, 190, 44, 1) 100%);
  color: #fff;
  padding: 20px 10px;
  box-shadow: 0 4px 10px rgba(154, 68, 68, 0.2);
`;
const Title = styled.h1`
font-size: 2.0em;
margin-bottom: 10px;
display: flex; /* Use flexbox for centering */
justify-content: center; /* Center horizontally */
align-items: center; /* Center vertically */
gap: 10px; /* Adjust the gap between elements */
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`;

const NavLinksContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 8px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
const LogoutButton = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  position: absolute;
  top: 20px;
  right: 20px;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background-color: darkred;
    transform: scale(1.05);
  }
`;


const HeroSection = styled.div`
  position: relative;
  height: 600px; /* Increased height from default (was 500px) */
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
`;


const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  padding: 20px;
`;

const HeroTitle = styled.h2`
  font-size: 3em;
  margin-bottom: 20px;
`;

const HeroDescription = styled.p`
  font-size: 1.5em;
`;

const FeaturesSection = styled.section`
  padding: 60px 60px;
`;

const FeaturesHeader = styled.h2`
  font-size: 2em;
  text-align: center;
  margin-bottom: 30px;
  color: #33691e;
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const FeatureBox = styled.div`
  background-color: #fff;
  text-align: center;
  border: 2px solid #ddd;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureImage = styled.img`
  width: 150px;
  height: 220px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(19, 21, 19);
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1em;
  color: #555;
`;

const Footer = styled.footer`
  background-color: #33691e;
  color: #fff;
  padding: 25px;
  text-align: center;
  border-top: 3px solid #ffd700;
`;

const PaymentSection = styled.div`
  margin-bottom: 20px;
`;

const PaymentText = styled.h3`
  color: #ffd700;
  font-size: 1.5em;
  margin-bottom: 12px;
`;

const PaymentContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
`;

const PaymentImage = styled.img`
  width: 130px;
  height: 55px;
  border-radius: 6px;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  font-size: 24px;

  .icon {
    color: #ffd700;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #fff;
    }
  }
`;

export default HomePage;
