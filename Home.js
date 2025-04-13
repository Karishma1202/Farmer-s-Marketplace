import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4));
        pointer-events: none;
    }
`;

const Navbar = styled.nav`
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
    z-index: 10;
`;

const Title = styled.h1`
    color: white;
    font-size: 2.5rem;
    font-weight: 800;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.5px;
`;

const GlassCard = styled.div`
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    padding: 3rem 4rem;
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 5;
    transform: translateY(0);
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 35px;
`;

const Button = styled.button`
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    border: none;
    padding: 16px 36px;
    font-size: 1.125rem;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.35);
    display: flex;
    align-items: center;
    gap: 8px;
    
    &:hover {
        background: linear-gradient(135deg, #1d4ed8, #1e40af);
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 15px 30px rgba(37, 99, 235, 0.45);
    }
    
    &:active {
        transform: translateY(0) scale(0.98);
    }
`;

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Navbar>
                <Title>Welcome to Farmers MarketPlace</Title>
            </Navbar>
            <GlassCard>
                <h2 style={{ 
                    color: "#fff", 
                    marginBottom: "20px", 
                    fontSize: "1.5rem", 
                    fontWeight: "600",
                    textShadow: "1px 1px 4px rgba(0,0,0,0.3)"
                }}>
                    Select Your Role
                </h2>
                <ButtonContainer>
                    <Button onClick={() => navigate("/framers")}>
                        <span style={{ fontSize: "1.25rem" }}>👨‍🌾</span> Farmers
                    </Button>
                    <Button onClick={() => navigate("/customers")}>
                        <span style={{ fontSize: "1.25rem" }}>🛒</span> Customers
                    </Button>
                </ButtonContainer>
            </GlassCard>
        </Container>
    );
};

export default Home;