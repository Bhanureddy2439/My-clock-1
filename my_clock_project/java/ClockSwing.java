import javax.swing.*;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * Simple Swing digital clock that reads system time and updates every second.
 */
public class ClockSwing extends JFrame {
    private final JLabel timeLabel = new JLabel();
    private final SimpleDateFormat formatter24 = new SimpleDateFormat("HH:mm:ss");
    private final SimpleDateFormat formatter12 = new SimpleDateFormat("hh:mm:ss a");

    public ClockSwing() {
        super("My Clock Project - Java Swing");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(360, 140);
        setLayout(new BorderLayout());
        timeLabel.setHorizontalAlignment(SwingConstants.CENTER);
        timeLabel.setFont(new Font("Monospaced", Font.BOLD, 28));
        add(timeLabel, BorderLayout.CENTER);

        JPanel bottom = new JPanel();
        JCheckBox use24 = new JCheckBox("Use 24-hour");
        use24.setSelected(true);
        bottom.add(use24);
        add(bottom, BorderLayout.SOUTH);

        // Timer updates every 1 second (1000 ms). Aligning to second boundary is not critical in Swing,
        // but we use a Swing Timer for thread-safe UI updates.
        Timer timer = new Timer(1000, new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                Date now = new Date();
                String text = use24.isSelected() ? formatter24.format(now) : formatter12.format(now);
                timeLabel.setText(text);
            }
        });

        // Start immediately and on a 1-second timer.
        timer.setInitialDelay(0);
        timer.start();

        setLocationRelativeTo(null);
        setVisible(true);
    }

    public static void main(String[] args) {
        // Ensure UI is created on the Event Dispatch Thread
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new ClockSwing();
            }
        });
    }
}
