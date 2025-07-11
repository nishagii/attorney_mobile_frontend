import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { fonts } from '../../../constants/fonts';

const PricingPage = () => {
    const [billingPeriod, setBillingPeriod] = useState('monthly');
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
    const scrollViewRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    // Calculate responsive dimensions
    const isSmallScreen = screenWidth < 375;
    const isMediumScreen = screenWidth >= 375 && screenWidth < 414;
    const isLargeScreen = screenWidth >= 414;

    const cardPadding = isSmallScreen ? 16 : isMediumScreen ? 20 : 24;
    const horizontalPadding = isSmallScreen ? 20 : isMediumScreen ? 24 : 32;
    const cardWidth = screenWidth - (horizontalPadding * 2);

    const plans = [
        {
            id: 'free',
            name: '7 days Free Trial',
            description: '',
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                'Unlimited AI usage here',
                'Premium support',
                'Customer care on point',
                'Collaboration tools'
            ],
            isFree: true,
            buttonColor: '#E5E7EB'
        },
        {
            id: 'pro',
            name: 'Pro',
            description: '',
            monthlyPrice: 5,
            yearlyPrice: 4,
            features: [
                'Integrations with 3rd-party',
                'Advanced analytics',
                'Team performance tracking',
                'Top grade security',
                'Customizable Solutions'
            ],
            popular: true,
            buttonColor: '#323D68'
        },
        {
            id: 'educator',
            name: 'Educator',
            monthlyPrice: 2,
            yearlyPrice: 1.6,
            features: [
                'Custom reports & dashboards',
                'Most performance usage',
                'Enterprise-grade security',
                'Customizable Solutions',
                'Seamless integrations',
            ],
            buttonColor: '#E5E7EB'
        }
    ];

    const faqs = [
        {
            question: 'What is Alter ?',
            answer: 'Alter is an AI-powered legal assistant that helps attorneys manage their practice more efficiently.'
        },
        {
            question: 'Do I need coding skills to use Alter ?',
            answer: 'No, Alter is designed to be user-friendly and requires no coding skills whatsoever.'
        },
        {
            question: 'Is Alter optimized for SEO ?',
            answer: 'Yes, Alter includes built-in SEO optimization tools for your legal content and website.'
        },
        {
            question: 'Can I customize Alter to fit my brand ?',
            answer: 'Absolutely! Alter offers extensive customization options to match your law firm&apos;s branding.'
        },
        {
            question: 'Does Alter include mobile responsiveness ?',
            answer: 'Yes, Alter is fully responsive and works seamlessly across all devices and screen sizes.'
        }
    ];

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        setCurrentPlanIndex(index);
    };

    const PlanCard = ({ plan }) => {
        const price = billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

        // Fixed height for all cards to ensure consistency
        const cardHeight = isSmallScreen ? 480 : isMediumScreen ? 520 : 560;

        return (
            <View
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: isSmallScreen ? 12 : 16,
                    padding: cardPadding,
                    width: cardWidth,
                    height: cardHeight,
                    marginVertical: 20,
                    borderWidth: plan.popular ? 2 : 1,
                    borderColor: plan.popular ? '#FF8800' : '#e5e7eb',
                    position: 'relative',
                }}
            >
                {plan.popular && (
                    <View
                        style={{
                            position: 'absolute',
                            top: -8,
                            right: 16,
                            backgroundColor: '#FF8800',
                            paddingVertical: 4,
                            paddingHorizontal: 12,
                            borderRadius: 20,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            color: '#ffffff',
                            fontSize: 12,
                            fontFamily: fonts.semiBold
                        }}>
                            POPULAR
                        </Text>
                    </View>
                )}

                <Text style={{
                    fontSize: isSmallScreen ? 18 : 20,
                    fontFamily: fonts.semiBold,
                    color: '#000000',
                    marginBottom: plan.description ? 4 : 16
                }}>
                    {plan.name}
                </Text>

                {plan.description && (
                    <Text style={{
                        fontSize: isSmallScreen ? 12 : 14,
                        fontFamily: fonts.regular,
                        color: '#5E788F',
                        marginBottom: 16
                    }}>
                        {plan.description}
                    </Text>
                )}

                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 16 }}>
                    <Text style={{
                        fontSize: isSmallScreen ? 28 : isMediumScreen ? 30 : 32,
                        fontFamily: fonts.bold,
                        color: '#000000'
                    }}>
                        ${plan.isFree ? '0' : price}
                    </Text>
                    <Text style={{
                        fontSize: isSmallScreen ? 14 : 16,
                        fontFamily: fonts.regular,
                        color: '#5E788F',
                        marginLeft: 4
                    }}>
                        {plan.isFree ? '' : `/${billingPeriod === 'monthly' ? 'user/month' : 'user/year'}`}
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        borderRadius: 8,
                        marginBottom: isSmallScreen ? 20 : 24,
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <LinearGradient
                        colors={plan.buttonColor === '#323D68'
                            ? ['#323D68', '#1a1f3a']
                            : ['#ffffff', '#5E788F']
                        }
                        start={{ x: 1.5, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={{
                            paddingVertical: isSmallScreen ? 10 : 12,
                            paddingHorizontal: isSmallScreen ? 20 : 24,
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{
                            color: plan.buttonColor === '#323D68' ? '#ffffff' : '#000000',
                            fontSize: isSmallScreen ? 14 : 16,
                            fontFamily: fonts.semiBold
                        }}>
                            Get Started
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                <Text style={{
                    fontSize: isSmallScreen ? 12 : 14,
                    fontFamily: fonts.medium,
                    color: '#000000',
                    marginBottom: 16
                }}>
                    {plan.isFree ? 'Everything in FREE plan' : plan.id === 'pro' ? 'Everything in Pro plan' : 'Dedicated for Law students/researchers'}
                </Text>

                <View style={{ flex: 1 }}>
                    {plan.features.map((feature, index) => (
                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: isSmallScreen ? 10 : 12 }}>
                            <Ionicons
                                name="checkmark"
                                size={isSmallScreen ? 14 : 16}
                                color="#5E788F"
                                style={{ marginRight: 12 }}
                            />
                            <Text style={{
                                fontSize: isSmallScreen ? 12 : 14,
                                fontFamily: fonts.regular,
                                color: '#5E788F',
                                flex: 1
                            }}>
                                {feature}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const FAQItem = ({ faq, index }) => {
        const isExpanded = expandedFAQ === index;

        return (
            <View style={{
                backgroundColor: '#F8FAFB',
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#e5e7eb'
            }}>
                <TouchableOpacity
                    onPress={() => setExpandedFAQ(isExpanded ? null : index)}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontFamily: fonts.semiBold,
                        color: '#111827',
                        flex: 1,
                        marginRight: 16
                    }}>
                        {faq.question}
                    </Text>
                    <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="#6b7280"
                    />
                </TouchableOpacity>

                {isExpanded && (
                    <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                        <Text style={{
                            fontSize: 14,
                            fontFamily: fonts.regular,
                            color: '#6b7280',
                            lineHeight: 20
                        }}>
                            {faq.answer}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
            {/* Header */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 16,
                backgroundColor: '#ffffff',
                borderBottomWidth: 1,
                borderBottomColor: '#e5e7eb',
            }}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ marginRight: 16 }}
                >
                    <Ionicons name="arrow-back" size={24} color="#000000" />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontFamily: fonts.bold,
                    color: '#000000'
                }}>
                    Pricing Plans
                </Text>
            </View>

            <ScrollView style={{ flex: 1 }}>
                {/* Hero Section */}
                <View style={{ paddingHorizontal: 20, paddingTop: isSmallScreen ? 60 : 40, paddingBottom: 24 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 8,
                        backgroundColor: '#E1F1FF',
                        paddingHorizontal: 16,
                        borderRadius: 20,
                        alignSelf: 'center'
                    }}>
                        <Ionicons name="shield-checkmark" size={20} color="#5E788F" style={{ marginRight: 8 }} />
                        <Text style={{
                            fontSize: isSmallScreen ? 11 : 12,
                            fontFamily: fonts.medium,
                            paddingVertical: 4,
                            color: '#5E788F'
                        }}>
                            Transparent Pricing. No Surprises
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: isSmallScreen ? 24 : isMediumScreen ? 26 : 28,
                        fontFamily: fonts.bold,
                        color: '#111827',
                        textAlign: 'center',
                        marginBottom: 8
                    }}>
                        Flexible Plans for All
                    </Text>
                    <Text style={{
                        fontSize: isSmallScreen ? 13 : 14,
                        fontFamily: fonts.regular,
                        color: '#6b7280',
                        textAlign: 'center',
                        lineHeight: isSmallScreen ? 22 : 26,
                        paddingHorizontal: isSmallScreen ? 10 : 0
                    }}>
                        Choose a plan that fits your team and scale as you grow
                    </Text>
                </View>

                {/* Billing Toggle */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingHorizontal: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: '#F3F4F6',
                        borderRadius: 12,
                        padding: 4,
                    }}>
                        <TouchableOpacity
                            onPress={() => setBillingPeriod('monthly')}
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 24,
                                borderRadius: 8,
                                backgroundColor: billingPeriod === 'monthly' ? '#ffffff' : 'transparent',
                            }}
                        >
                            <Text style={{
                                color: billingPeriod === 'monthly' ? '#000000' : '#6b7280',
                                fontSize: 14,
                                fontFamily: fonts.medium
                            }}>
                                Monthly
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setBillingPeriod('yearly')}
                            style={{
                                paddingVertical: 8,
                                paddingHorizontal: 24,
                                borderRadius: 8,
                                backgroundColor: billingPeriod === 'yearly' ? '#ffffff' : 'transparent',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{
                                color: billingPeriod === 'yearly' ? '#000000' : '#6b7280',
                                fontSize: 14,
                                fontFamily: fonts.medium,
                                marginRight: 8
                            }}>
                                Yearly
                            </Text>
                            <View style={{
                                backgroundColor: '#ff8800',
                                paddingHorizontal: 6,
                                paddingVertical: 2,
                                borderRadius: 12,
                            }}>
                                <Text style={{
                                    color: '#ffffff',
                                    fontSize: 10,
                                    fontFamily: fonts.bold
                                }}>
                                    Save 20%
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pricing Cards */}
                <View style={{ marginBottom: 32 }}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={screenWidth}
                        decelerationRate="fast"
                        contentContainerStyle={{
                            paddingHorizontal: 0,
                            alignItems: 'center'
                        }}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        pagingEnabled
                    >
                        {plans.map((plan, index) => (
                            <View key={plan.id} style={{
                                width: screenWidth,
                                paddingHorizontal: horizontalPadding,
                                alignItems: 'center'
                            }}>
                                <PlanCard plan={plan} />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Plan Indicators */}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10,
                        gap: 8,
                    }}>
                        {plans.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setCurrentPlanIndex(index);
                                    scrollViewRef.current?.scrollTo({
                                        x: index * screenWidth,
                                        animated: true,
                                    });
                                }}
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: currentPlanIndex === index ? '#FF8800' : '#E5E7EB',
                                }}
                            />
                        ))}
                    </View>
                </View>

                {/* FAQ Section */}
                <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 32 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 8,
                        backgroundColor: '#F0F4F8',
                        paddingHorizontal: 16,
                        borderRadius: 20,
                        alignSelf: 'center'
                    }}>
                        <Ionicons name="shield-checkmark" size={20} color="#5E788F" style={{ marginRight: 8 }} />
                        <Text style={{
                            fontSize: isSmallScreen ? 11 : 12,
                            fontFamily: fonts.medium,
                            paddingVertical: 4,
                            color: '#5E788F'
                        }}>
                            Your Queries, Simplified
                        </Text>
                    </View>
                    <Text style={{
                        fontSize: isSmallScreen ? 24 : isMediumScreen ? 26 : 28,
                        fontFamily: fonts.bold,
                        color: '#111827',
                        textAlign: 'center',
                        marginBottom: 8
                    }}>
                        Questions? Answers!
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: fonts.regular,
                        color: '#6b7280',
                        textAlign: 'center',
                        marginBottom: 24
                    }}>
                        Find quick answers to the most common questions about our platform
                    </Text>

                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </View>

                {/* Contact Section */}
                <View style={{
                    backgroundColor: '#F8FAFB',
                    marginHorizontal: 20,
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 32,
                    alignItems: 'center',
                }}>
                    <Ionicons name="mail" size={24} color="#5E788F" style={{ marginBottom: 16 }} />
                    <Text style={{
                        fontSize: 14,
                        fontFamily: fonts.regular,
                        color: '#6b7280',
                        textAlign: 'center',
                        marginBottom: 8
                    }}>
                        Feel free to mail us for any enquiries :
                    </Text>
                    <TouchableOpacity>
                        <Text style={{
                            color: '#5BB5FE',
                            fontSize: 14,
                            fontFamily: fonts.regular,
                            textDecorationLine: 'underline'
                        }}>
                            alter@support.com
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PricingPage;