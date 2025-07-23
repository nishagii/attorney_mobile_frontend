import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fonts } from '@/constants/fonts';
import Header from '../../components/Header';

const Calendar = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 16)); // July 16, 2025
  
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleNotificationPress = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };
  
  const isToday = (date: Date) => {
    const today = new Date(2025, 6, 16); // Current date as shown in image
    return date.toDateString() === today.toDateString();
  };
  
  const hasEvent = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    if (month === 6) { // July
      if (day === 8) return 'green'; // Has event (green indicator)
      if (day === 11) return 'red'; // Has event (red indicator)
      if (day === 18) return 'blue'; // Has event (blue indicator)
      if (day === 16 || day === 19) return 'selected'; // Selected dates
    }
    return null;
  };
  
  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const hearings = [
    {
      id: 1,
      time: '9:00 AM - 10:00 AM',
      title: 'Galle High Court',
      avatar: '👨‍💼'
    }
  ];
  
  const freeTimeSlots = [
    {
      id: 1,
      time: '11:00 AM - 12:00 PM',
      status: 'Available Slot',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      time: '2:00 PM - 3:00 PM',
      status: 'Available',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      time: '4:00 PM - 5:00 PM',
      status: 'Available',
      avatar: '👨‍💼'
    }
  ];

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#111827" }}>
      {/* Unified Header */}
      <Header
        title=""
        showMenu={true}
        showNotification={true}
        backgroundColor="#111827"
        textColor="#fff"
        iconColor="#fff"
        borderColor="#111827"
        showNotificationBadge={true}
        onMenuPress={() => {}}
        onNotificationPress={handleNotificationPress}
        onPaymentsPress={() => {}}
        onMeetingsPress={() => {}}
        onCasedetails={() => {}}
        onAccountUsers={() => {}}
      />

      {/* Main Content with Layered Background */}
      <View style={{ flex: 1, backgroundColor: "#111827" }}>
        {/* Welcome Message Section */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 4,
              fontFamily: fonts.semiBold,
            }}
          >
            Your Calendar
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#FF8800",
              marginBottom: 12,
              fontWeight: "500",
              fontFamily: fonts.medium,
            }}
          >
            {formattedDate}
          </Text>
        </View>

        {/* White Rounded Overlay Container with Gradient */}
        <LinearGradient
          colors={["#fff3e0", "#f9fafb", "#f9fafb"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.1 }}
          style={{
            flex: 1,
            marginTop: 40,
            borderTopLeftRadius: 100,
            paddingTop: 40,
          }}
        >
          <Animated.ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Calendar Header */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => navigateMonth(-1)}>
                <Ionicons name="chevron-back" size={24} color="#6b7280" />
              </TouchableOpacity>
              <Text style={styles.monthYear}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </Text>
              <TouchableOpacity onPress={() => navigateMonth(1)}>
                <Ionicons name="chevron-forward" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            {/* Calendar Grid */}
            <View style={styles.calendar}>
              {/* Day headers */}
              <View style={styles.dayHeaders}>
                {dayNames.map((day, index) => (
                  <Text key={index} style={styles.dayHeader}>{day}</Text>
                ))}
              </View>
              
              {/* Calendar days */}
              <View style={styles.calendarGrid}>
                {generateCalendarDays().map((date, index) => {
                  const eventType = hasEvent(date);
                  const isCurrentMonthDay = isCurrentMonth(date);
                  const isTodayDate = isToday(date);
                  
                  return (
                    <TouchableOpacity key={index} style={styles.dayContainer}>
                      <View style={[
                        styles.dayCell,
                        eventType === 'selected' && styles.selectedDay,
                        isTodayDate && styles.todayDay
                      ]}>
                        <Text style={[
                          styles.dayText,
                          !isCurrentMonthDay && styles.otherMonthDay,
                          (eventType === 'selected' || isTodayDate) && styles.selectedDayText
                        ]}>
                          {date.getDate()}
                        </Text>
                        {eventType && eventType !== 'selected' && (
                          <View style={[styles.eventIndicator, 
                            eventType === 'green' && styles.greenIndicator,
                            eventType === 'red' && styles.redIndicator,
                            eventType === 'blue' && styles.blueIndicator
                          ]} />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            
            {/* Add Hearing Button */}
            <TouchableOpacity style={styles.addHearingButton}>
              <Text style={styles.addHearingText}>Add Hearing</Text>
            </TouchableOpacity>
            
            {/* Hearings Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hearings</Text>
              {hearings.map((hearing) => (
                <View key={hearing.id} style={styles.listItem}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{hearing.avatar}</Text>
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTime}>{hearing.time}</Text>
                    <Text style={styles.itemTitle}>{hearing.title}</Text>
                  </View>
                </View>
              ))}
            </View>
            
            {/* Free Time Slots Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Free Time Slots</Text>
              {freeTimeSlots.map((slot) => (
                <View key={slot.id} style={styles.listItem}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{slot.avatar}</Text>
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTime}>{slot.time}</Text>
                    <Text style={styles.itemStatus}>{slot.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.ScrollView>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60, // Account for floating content above
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYear: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    fontFamily: fonts.semiBold,
  },
  calendar: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    paddingVertical: 8,
    fontFamily: fonts.medium,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.285714%', // 100% / 7 days
    aspectRatio: 1,
    padding: 2,
  },
  dayCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'relative',
  },
  selectedDay: {
    backgroundColor: '#374151',
  },
  todayDay: {
    backgroundColor: '#374151',
  },
  dayText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    fontFamily: fonts.medium,
  },
  selectedDayText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  otherMonthDay: {
    color: '#d1d5db',
  },
  eventIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 20,
    height: 3,
    borderRadius: 2,
  },
  greenIndicator: {
    backgroundColor: '#10b981',
  },
  redIndicator: {
    backgroundColor: '#ef4444',
  },
  blueIndicator: {
    backgroundColor: '#3b82f6',
  },
  addHearingButton: {
    backgroundColor: '#374151',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  addHearingText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fonts.semiBold,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    fontFamily: fonts.semiBold,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
  },
  itemContent: {
    flex: 1,
  },
  itemTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
    fontFamily: fonts.semiBold,
  },
  itemTitle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: fonts.regular,
  },
  itemStatus: {
    fontSize: 14,
    color: '#10b981',
    fontFamily: fonts.medium,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 30,
  },
  placeholder: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

export default Calendar;
