package shoppingcatalog.dbutil;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBdata implements DBconn {
	private static Connection conn=null;
	private DBdata() {
		
	}
	static {
		try {
			Class.forName(DRIVER);
			conn=DriverManager.getConnection(URL,USER,PASSWORD);
			System.out.println("established Connection");
					
		} catch(Exception e) {
			System.out.println("Exception in getconnection" +e);
		}
	}
	static public Connection getConnection() {
		return conn;
	}
	public static void main(String args[])
	{
		System.out.println(getConnection());
	}

}
